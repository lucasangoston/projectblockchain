import { Box, Container, Grid } from '@mui/material';
import { PostList } from '../home/post/PostList';
import ProfileInfos from './profileInfos';
import ProfileTabs from './profileTabs';

export function Profile({ nft }) {
  return (
    <div className="flex">
      <Box sx={{ ml: '2rem' }}>
        <ProfileInfos></ProfileInfos>
      </Box>
      <Box>
        <ProfileTabs nfts={nft}></ProfileTabs>
      </Box>
    </div>
  );
}
