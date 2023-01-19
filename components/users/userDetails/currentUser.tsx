import {
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  Link,
} from '@mui/material';
import { Component, useState, useEffect } from 'react';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { ethers } from 'ethers';
import ABI from '../../../abi/interaction.json';
import { client } from '../../../api';
import { getUserNfts } from '../../../api/nft';
import { blue } from '@mui/material/colors';
import { useRouter } from 'next/router';

const address = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';

export function HandleClickFollowUser() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    followUser(id);
  }, [id]);

  async function followUser(id: any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(address, ABI, signer);

    try {
      const tx = await contract.follow([id], [0x0]);
      await tx.wait();
    } catch (err) {
      console.log({ err });
    }
  }
}

interface Props {
  profileData: any;
}

export function CurrentUser({ profileData }: Props) {
  const [isMatchingProfile, setIsMatchingProfile] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    searchIfIsMatching();
  }, []);

  async function searchIfIsMatching() {
    const myNftCollections = ['Lens Protocol Profiles']; // await getMyNfts(); Lens Protocol Profiles
    let containsSameCollections = false;
    const address = profileData.data.ownedBy;

    try {
      const response = await client.query({
        query: getUserNfts,
        variables: { address },
      });
      const nftsData = response.data.nfts.items;
      const nftCollections = await nftsData.map(
        (nft: any) => nft.collectionName,
      );

      myNftCollections.forEach((collection) => {
        if (nftCollections.includes(collection)) {
          containsSameCollections = true;
        }
      });
      setIsMatchingProfile(containsSameCollections);
    } catch (err) {
      console.log('error to get nfts', err);
    }
  }
  return (
    <Card className="fixed" style={{ width: '25vw' }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img src={profileData.data.avatarUrl} />
          </Avatar>
        }
        title={profileData.data.name}
        action={
          <IconButton aria-label="settings">
            {isMatchingProfile ? (
              <PersonAddIcon onClick={HandleClickFollowUser}></PersonAddIcon>
            ) : (
              <div></div>
            )}
          </IconButton>
        }
      />

      <CardActions>
        <Button onClick={() => setIsOpen(true)}>
          Followers {profileData.data['stats']['totalFollowers']} Followings{' '}
          {profileData.data['stats']['totalFollowing']}
        </Button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          style={{
            overflow: 'auto',
            maxHeight: '100vh',
          }}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Following</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} direction="column">
              <Grid item>
                {profileData.followings.map((profile: any) => {
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
                        <Grid item md={6}>
                          <Avatar
                            sx={{ bgcolor: blue[500] }}
                            aria-label="recipe"
                          >
                            {avatar}
                          </Avatar>
                        </Grid>
                        <Grid item md={6}>
                          <h2> {profile.name} </h2>
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
          <DialogContent>
            <Grid container spacing={2} direction="column">
              <Grid item>
                {profileData.followers.map((wallet: any) => {
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
                        {/* <Link href={`./users/${wallet.defaultProfile.id}`}>
                                <p className="cursor-pointer text-blue-600 text-lg font-medium text-center mt-2 mb-2">
                                  View
                                </p>
                              </Link> */}
                      </Grid>
                      <hr style={{ marginBottom: '10px', marginTop: '10px' }} />
                    </div>
                  );
                })}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </CardActions>
      {/* <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <h6 style={{ fontWeight: 'bold' }}>
                    {profileData.data.stats.totalFollowers} followers
                  </h6>
                </Grid>
                <Grid item xs={6}>
                  <h6 style={{ fontWeight: 'bold' }}>
                    {profileData.data.stats.totalFollowing} following
                  </h6>
                </Grid>
              </Grid>
            </CardContent> */}
      <CardContent></CardContent>
    </Card>
  );
}

// export class CurrentUser extends Component<{ profileData: any }> {

//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//     };
//   }

//    render() {

//   const [isMatchingProfile, setIsMatchingProfile] = useState(false);

//     let { profileData } = this.props;
//     console.log(profileData);
//     return (
//       <Card className="fixed" style={{ width: '25vw' }}>
//         <CardHeader
//           avatar={
//             <Avatar aria-label="recipe">
//               <img src={profileData.data.avatarUrl} />
//             </Avatar>
//           }
//           title={profileData.name}
//           action={
//             <IconButton aria-label="settings">
//              <PersonAddIcon onClick={followUser}></PersonAddIcon>
//             </IconButton>
//           }
//         />

//         <CardActions>
//           <Button onClick={() => this.setState({ open: true })}>
//             Followers {profileData.data['stats']['totalFollowers']} Followings {profileData.data['stats']['totalFollowing']}
//           </Button>
//           <Dialog
//             open={this.state.open}
//             onClose={() => this.setState({ open: false })}
//             style={{
//               overflow: 'auto',
//               maxHeight: '100vh',
//             }}
//             aria-labelledby="scroll-dialog-title"
//             aria-describedby="scroll-dialog-description"
//           >
//             <DialogTitle id="scroll-dialog-title">Following</DialogTitle>
//             <DialogContent dividers={scroll === 'paper'}>

//               <Grid container spacing={2} direction="column">
//                 <Grid item>
//                   {profileData.followings.map(({ profile }) => {
//                     let avatar = '';
//                     if (!profile.name) return;
//                     if (profile.name) avatar = (profile.name as string).slice(0, 1);
//                     return (
//                       <div className={styles.recommendations}>
//                         <Grid
//                           key={profile.id}
//                           container
//                           direction="row"
//                           justifyContent={'space-between'}
//                         >
//                           <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
//                             {avatar}
//                           </Avatar>
//                           <h2> {profile.name} </h2>
//                           {/* <Link href={`./users/${profile.id}`}>
//                             <p className="cursor-pointer text-blue-600 text-lg font-medium text-center mt-2 mb-2">
//                               View
//                             </p>
//                           </Link> */}
//                         </Grid>
//                         <hr style={{ marginBottom: '10px', marginTop: '10px' }} />
//                       </div>
//                     );
//                   })}
//                 </Grid>
//               </Grid>

//             </DialogContent>
//             <DialogTitle id="scroll-dialog-title">Followers</DialogTitle>
//             <DialogContent dividers={scroll === 'paper'}>
//               <Grid container spacing={2} direction="column">
//                 <Grid item>
//                   {profileData.followers.map(({ wallet }) => {
//                     let avatar = '';
//                     if (!wallet.defaultProfile.name) return;
//                     if (wallet.defaultProfile.name) avatar = (wallet.defaultProfile.name as string).slice(0, 1);
//                     return (
//                       <div className={styles.recommendations}>
//                         <Grid
//                           key={wallet.defaultProfile.id}
//                           container
//                           direction="row"
//                           justifyContent={'space-between'}
//                         >
//                           <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
//                             {avatar}
//                           </Avatar>
//                           <h2> {wallet.defaultProfile.name} </h2>
//                           {/* <Link href={`./users/${wallet.defaultProfile.id}`}>
//                             <p className="cursor-pointer text-blue-600 text-lg font-medium text-center mt-2 mb-2">
//                               View
//                             </p>
//                           </Link> */}
//                         </Grid>
//                         <hr style={{ marginBottom: '10px', marginTop: '10px' }} />
//                       </div>
//                     );
//                   })}
//                 </Grid>
//               </Grid>

//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => this.setState({ open: false })}>Cancel</Button>
//             </DialogActions>
//           </Dialog>
//         </CardActions>
//         {/* <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <h6 style={{ fontWeight: 'bold' }}>
//                 {profileData.data.stats.totalFollowers} followers
//               </h6>
//             </Grid>
//             <Grid item xs={6}>
//               <h6 style={{ fontWeight: 'bold' }}>
//                 {profileData.data.stats.totalFollowing} following
//               </h6>
//             </Grid>
//           </Grid>
//         </CardContent> */}
//         <CardContent></CardContent>
//       </Card>
//     );
//   }
// }

/*
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
 */
