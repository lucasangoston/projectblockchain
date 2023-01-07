import { Box, Container, Grid } from '@mui/material';
import UserInfos from './userInfos';
import UserTabs from './userTabs';

export function Profile() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ ml: '2rem' }}>
        <UserInfos id={''}></UserInfos>
      </Box>
      <Box>
        <UserTabs></UserTabs>
      </Box>
    </Box>
  );
}
