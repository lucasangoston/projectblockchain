import { Box, Container, Grid } from '@mui/material';
import { PostList } from '../home/post/PostList';
import { ChangeProfileButton } from '../utils/button/changeProfileButton';
import { MyProfiles } from './myProfiles';
import ProfileInfos from './profileInfos';
import ProfileTabs from './profileTabs';
import { Button, Link } from '@mui/material';


export function Profile({ nft }) {
  return (
    <div className="flex">
      <Box sx={{ ml: '2rem' }}>
        <ProfileInfos></ProfileInfos>
        <br></br>
      </Box>
      <Box>
        <ProfileTabs nfts={nft}></ProfileTabs>
      </Box>
    </div>
  );
}
