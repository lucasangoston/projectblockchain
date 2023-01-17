import * as React from 'react';
import { Post, PostFields } from './post';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

interface PostList {
  posts: any[];
}

interface Props {
  postList: never[];
}

export function PostList({ postList }: Props) {

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >

      <Grid item md={50}>
        {postList.map(({root}:any) => {
          return (<Post key={root.id} post={new PostFields(root.id, root.profile, root.metadata, root.createdAt)}></Post>)
        }
        )}
      </Grid>
    </Grid>
  );
}
