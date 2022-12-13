import * as React from 'react';
import { Post } from './post';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

export function PostList() {
  return (
    <Box display="grid" gap={2}>
      {/* remplacer une fois qu'ont aura de vraies données */}
      <Grid item>
        <Post></Post>
      </Grid>
      <Grid item>
        <Post></Post>
      </Grid>
      <Grid item>
        <Post></Post>
      </Grid>
      <Grid item>
        <Post></Post>
      </Grid>
    </Box>
  );
}
