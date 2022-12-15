import * as React from 'react';
import { Post } from './post';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

export function PostList() {
  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
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
