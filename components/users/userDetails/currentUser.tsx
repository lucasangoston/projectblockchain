import { Grid } from '@mui/material';
import { Component } from 'react';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { ethers } from 'ethers';
import ABI from '../../../abi/interaction.json';
import { router } from 'next/client';

const address = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';

async function followUser() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const { id } = router.query;

  const contract = new ethers.Contract(address, ABI, signer);

  try {
    const tx = await contract.follow([id], [0x0]);
    await tx.wait();
    console.log('followed user successfully');
  } catch (err) {
    console.log({ err });
  }
}

export class CurrentUser extends Component<{ profileData: any }> {
  render() {
    let { profileData } = this.props;
    return (
      <Card className="fixed" style={{ width: '25vw' }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <img src={profileData.avatarUrl} />
            </Avatar>
          }
          title={profileData.name}
          action={
            <IconButton aria-label="settings">
              <PersonAddIcon onClick={followUser}></PersonAddIcon>
            </IconButton>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <h6 style={{ fontWeight: 'bold' }}>
                {profileData.stats.totalFollowers} followers
              </h6>
            </Grid>
            <Grid item xs={6}>
              <h6 style={{ fontWeight: 'bold' }}>
                {profileData.stats.totalFollowing} following
              </h6>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent></CardContent>
      </Card>
    );
  }
}

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
