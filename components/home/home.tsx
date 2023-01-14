import { Box, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react'
import { PostList } from './post/PostList';
import { RecommendedUsers } from './recommendation/recommendedUsers';
import { WritePost } from './post/writePost';
import { client } from '../../api/api'
import { getFeed } from '../../api/feed'
import { PostFields } from './post/post';


export default function Home() {
  const [posts, setPosts] = useState([]);

  const profileId = "0x1b";
  fetchPosts();


async function fetchPosts() {

  const response = await client.query({
    query: getFeed,
    variables: {
      profileId,
      limit: 50,
    },
  });
  setPosts(response.data.feed.items);

  console.log(response);
  
  try {
  
    const postsData = await Promise.all(
      response.data.feed.items.map(async (feedInfo:any) => {
        const feed = { ...feedInfo };

        const post:PostFields = new PostFields(feed.id, feed.profile, feed.metaData, feed.createdAt);
        return post;
      }),
    
    )
  } catch (err) {
    console.log({ err });
  }}


  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
      <Box gridColumn="span 8">
        <PostList postList={posts}></PostList>
      </Box>
      <Box gridColumn="span 4">
        <RecommendedUsers></RecommendedUsers>
      </Box>
    </Box>
  );
}
