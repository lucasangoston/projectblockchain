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
import {
  client,
  defaultProfile,
  getProfileById,
  getPublications,
} from '../../api';
import { ethers } from 'ethers';
import ABI from '../../abi/interaction.json';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const address = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';

export default function UserInfos(props: { id: String }) {
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

  const [profileData, setProfileData] = useState();
  const [pubs, setPubs] = useState([]);

  const router = useRouter();
  //const { id } = router.query;

  useEffect(() => {
    if (props.id) {
      fetchProfileById();
    }
  }, [props.id]);

  const idd = props.id;

  async function fetchProfileById() {
    try {
      const returnedProfileById = await client.query({
        query: getProfileById,
        variables: { idd },
      });
      console.log(returnedProfileById);
      const data = { ...returnedProfileById.data.profile };
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
      setProfileData(data);

      const publications = await client.query({
        query: getPublications,
        variables: {
          id: data.id,
          limit: 50,
        },
      });
      setPubs(publications.data.publications.items);

      console.log('pubs : ', publications);
    } catch (err) {
      console.log('error fetching profile...', err);
    }
  }

  async function followUser() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(address, ABI, signer);

    try {
      const tx = await contract.follow([props.id], [0x0]);
      await tx.wait();
      console.log('followed user successfully');
    } catch (err) {
      console.log({ err });
    }
  }

  if (!profileData) return null;

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={profileData['avatarUrl']}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {profileData['handle']}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profileData['bio']}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClickOpen('paper')}>
          Followers {profileData['stats']['totalFollowers']}
        </Button>
        <Button onClick={handleClickOpen('paper')}>
          Folliwings {profileData['stats']['totalFollowing']}
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
