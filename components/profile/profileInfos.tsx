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
import {
  defaultProfile,
  follower,
  following,
  getMyProfiles,
} from '../../api/profile';
import { ethers } from 'ethers';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Grid, Link } from '@mui/material';
import styles from '../home/recommendation/styles/recommendedUsers.module.css';
import { blue } from '@mui/material/colors';
import { client } from '../../api/api';
import { ChangeProfileButton } from '../utils/button/changeProfileButton';

export default function ProfileInfos() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [openProfiles, setOpenProfiles] = React.useState(false);

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenProfiles = (scrollType: DialogProps['scroll']) => () => {
    setOpenProfiles(true);
    setScroll(scrollType);
  };

  const handleCloseProfiles = () => {
    setOpenProfiles(false);
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

  const [myProfile, setProfile] = React.useState();
  const [followings, setFollowings] = React.useState([]);
  const [followers, setFollow] = React.useState([]);
  const [myProfiles, setMyProfiles] = React.useState([]);

  React.useEffect(() => {
    fetchProfile();
  }, []);

  React.useEffect(() => {
    fetchMyProfiles();
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

      const data = { ...returnedProfile.data.defaultProfile };

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

      const profileFollowing = await client.query({
        query: following,
        variables: {
          address: userConnected,
          limit: 50,
        },
      });
      setFollowings(profileFollowing.data.following.items);

      const profileFollowers = await client.query({
        query: follower,
        variables: {
          profileId: data.id,
          limit: 50,
        },
      });
      if (profileFollowers.data.followers.items)
        setFollow(profileFollowers.data.followers.items);
    } catch (err) {
      console.log('error fetching profile...', err);
    }
  }

  async function fetchMyProfiles() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const myAddress = await signer.getAddress();

    try {
      const returnedProfiles = await client.query({
        query: getMyProfiles,
        variables: { address: myAddress },
      });

      const profiles = returnedProfiles.data.profiles.items;

      setMyProfiles(returnedProfiles.data.profiles.items);
    } catch (err) {
      console.log('error fetching profile...', err);
    }
  }
  if (!myProfile || !myProfiles) return;

  return (
    <Card sx={{ width: '22vw' }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img src={myProfile['avatarUrl']} />
          </Avatar>
        }
        title={myProfile['handle']}
      />
      <CardActions>
        <Button onClick={handleClickOpenProfiles('paper')}>My Profiles</Button>
        <Dialog
          open={openProfiles}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          style={{
            overflow: 'auto',
            maxHeight: '70vh',
          }}
        >
          <DialogTitle id="scroll-dialog-title">My profiles</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                {myProfiles.map((profile: any) => {
                  let avatar = '';

                  if (profile?.id === undefined) return;
                  if (profile.handle)
                    avatar = (profile.handle as string).slice(0, 1);
                  return (
                    <div key={profile.id} style={{ marginBottom: '10px' }}>
                      <Grid
                        container
                        direction="row"
                        justifyContent={'space-between'}
                      >
                        <Avatar
                          sx={{ bgcolorm: blue[500] }}
                          aria-label="recipe"
                        >
                          {avatar}
                        </Avatar>
                        <h2> {profile.handle} </h2>
                        <ChangeProfileButton
                          id={profile.id}
                        ></ChangeProfileButton>
                      </Grid>
                      <hr style={{ marginBottom: '10px', marginTop: '10px' }} />
                    </div>
                  );
                })}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseProfiles}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <Button onClick={handleClickOpen('paper')}>
          Followers {myProfile['stats']['totalFollowers']} Followings{' '}
          {myProfile['stats']['totalFollowing']}
        </Button>
        <Dialog
          open={open}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          style={{
            overflow: 'auto',
            maxHeight: '70vh',
          }}
        >
          <DialogTitle id="scroll-dialog-title">Following</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                {followings.map((profile: any) => {
                  let avatar = '';
                  if (!profile.name) return;
                  if (profile.name)
                    avatar = (profile.name as string).slice(0, 1);
                  return (
                    <div key={profile.id} style={{ marginBottom: '10px' }}>
                      <Grid
                        container
                        direction="row"
                        justifyContent={'space-between'}
                      >
                        <br></br>
                        <Grid item md={6}>
                          <Avatar
                            sx={{ bgcolor: blue[500], marginRight: '50px' }}
                            aria-label="recipe"
                          >
                            {avatar}
                          </Avatar>
                        </Grid>
                        <Grid item md={6}>
                          <h2> {profile.name} </h2>
                        </Grid>
                        <Grid item md={6}>
                          <Link href={'./users/${profile.id}'}>
                            <p className="cursor-pointer text-blue-600 text-lg font-medium text-center mt-2 mb-2">
                              View
                            </p>
                          </Link>
                        </Grid>
                      </Grid>
                      <hr style={{ marginBottom: '10px', marginTop: '10px' }} />
                    </div>
                  );
                })}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogTitle id="scroll-dialog-title">Followers</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                {followers.map((wallet: any) => {
                  let avatar = '';
                  if (!wallet.defaultProfile.name) return;
                  if (wallet.defaultProfile.name)
                    avatar = (wallet.defaultProfile.name as string).slice(0, 1);
                  return (
                    <div
                      key={wallet.defaultProfile.id}
                      style={{ marginBottom: '10px' }}
                    >
                      <Grid
                        container
                        direction="row"
                        justifyContent={'space-between'}
                      >
                        <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                          {avatar}
                        </Avatar>
                        <h2> {wallet.defaultProfile.name} </h2>
                        <Link href={'./users/${profile.id}'}>
                          <p className="cursor-pointer text-blue-600 text-lg font-medium text-center mt-2 mb-2">
                            View
                          </p>
                        </Link>
                      </Grid>
                      <hr style={{ marginBottom: '10px', marginTop: '10px' }} />
                    </div>
                  );
                })}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
