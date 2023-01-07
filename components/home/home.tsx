import { Box, Container, Grid } from '@mui/material';
import { PostList } from './post/PostList';
import { RecommendedUsers } from './recommendation/recommendedUsers';
import { WritePost } from './post/writePost';

export function Home() {
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
      <Box gridColumn="span 8">
        <PostList></PostList>
      </Box>
      <Box gridColumn="span 4">
        <RecommendedUsers></RecommendedUsers>
      </Box>
    </Box>
  );
}
