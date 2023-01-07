import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { RecommendedUsers } from '../home/recommendation/recommendedUsers';
import { client, defaultProfile } from '../../api';
import { ethers } from 'ethers';

export default function ProfileInfos() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [profile, setProfile] = React.useState();
  const [pubs, setPubs] = React.useState([]);

  React.useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const userConnected = await signer.getAddress();

    try {
      const returnedProfile = await client.query({
        query: defaultProfile,
        variables: { ethereumAddress: userConnected },
      });
      console.log(returnedProfile);
      const data = { ...returnedProfile.data.defaultProfile };
      console.log(data.name);
      /* format their picture if it is not in the right format */
      const picture = data.picture;
      if (picture || picture.original || picture.original.url) {
        if (picture.original.url.startsWith('ipfs://')) {
          const result = picture.original.url.substring(
            7,
            picture.original.url.length,
          );
          data.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
        } else {
          data.avatarUrl = data.picture.original.url;
        }
      }
      setProfile(data);

      // const publications = await client.query({
      //   query: getPublications,
      //   variables: {
      //     id: data.id,
      //     limit: 50,
      //   },
      // });
      // setPubs(publications.data.publications.items);

      // console.log('pubs : ', publications);
    } catch (err) {
      console.log('error fetching profile...', err);
    }
  }

  if (!profile) return null;

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={profile['avatarUrl']}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {profile['handle']}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profile['bio']}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClickOpen('paper')}>
          Followers {profile['stats']['totalFollowers']}
        </Button>
        <Button onClick={handleClickOpen('paper')}>
          Followings {profile['stats']['totalFollowing']}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Follow</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <RecommendedUsers></RecommendedUsers>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
