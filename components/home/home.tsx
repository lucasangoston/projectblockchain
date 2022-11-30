import { Box, Container, Grid } from '@mui/material';
import { PostList } from './post/PostList';
import { RecommendedUsers } from './recommendation/recommendedUsers';

export function Home() {
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
      <Box gridColumn="span 8">
        <PostList></PostList>
      </Box>
      <Box gridColumn="span 3">
        <RecommendedUsers></RecommendedUsers>
      </Box>
    </Box>
  );
}
