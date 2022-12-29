import { Box, Container, Grid } from '@mui/material';
import { PostList } from '../home/post/PostList';
import ProfileInfos from './profileInfos';
import ProfileTabs from './profileTabs';

export function Profile({nfts}) {
  console.log(nfts);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ ml: '2rem' }}>
        <ProfileInfos></ProfileInfos>
      </Box>
      <Box>
        <ProfileTabs nfts={nfts}></ProfileTabs>
      </Box>
    </Box>
  );
}
