import { Box } from '@mui/material';
import ProfileInfos from './profileInfos';
import ProfileTabs from './profileTabs';

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
