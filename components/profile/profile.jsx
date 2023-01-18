import { Box, Container, Grid } from '@mui/material';
import { PostList } from '../home/post/PostList';
import { MyProfiles } from './myProfiles';
import ProfileInfos from './profileInfos';
import ProfileTabs from './profileTabs';

export function Profile({ nft }) {
  return (
    <div className="flex">
      <Box sx={{ ml: '2rem' }}>
        <ProfileInfos></ProfileInfos>
        <MyProfiles></MyProfiles>
      </Box>
      <Box>
        <ProfileTabs nfts={nft}></ProfileTabs>
      </Box>
    </div>
  );
}
