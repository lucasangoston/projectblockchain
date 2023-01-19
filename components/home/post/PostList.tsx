import * as React from 'react';
import { Post } from './post';
import { Grid } from '@mui/material';
import { PostFields } from '../../../domain/PostFields';

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
        {postList.map(({ root, comments }: any) => {
          return (
            <Post
              key={root.id}
              post={
                new PostFields(
                  root.id,
                  root.profile,
                  root.metadata,
                  root.createdAt,
                )
              }
              comments={comments}
            ></Post>
          );
        })}
      </Grid>
    </Grid>
  );
}
