import * as React from 'react';
import { Post } from './post';
import { Grid } from '@mui/material';
import { WritePost } from './writePost';

export function PostList() {
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
      {/* remplacer une fois qu'ont aura de vraies données */}
      <Grid item md={10}>
        <Post></Post>
      </Grid>
      <Grid item md={10}>
        <Post></Post>
      </Grid>
      <Grid item md={10}>
        <Post></Post>
      </Grid>
      <Grid item md={10}>
        <Post></Post>
      </Grid>
    </Grid>
  );
}
