import { Box, Container, Grid } from '@mui/material';
import { PostList } from '../home/post/PostList';
import UserInfos from './userInfos';
import UserTabs from './usertabs';

export function Profile() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ ml: '2rem' }}>
        <UserInfos></UserInfos>
      </Box>

      <Box>
        <UserTabs></UserTabs>
      </Box>
    </Box>
  );
}
