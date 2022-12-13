import { WritePost } from '../post/writePost';
import { Grid } from '@mui/material';
import * as React from 'react';
import { PostList } from '../post/PostList';

export function Feed() {
  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item md={10}>
        <WritePost></WritePost>
      </Grid>
      <Grid item md={10}>
        <PostList></PostList>
      </Grid>
    </Grid>
  );
}
