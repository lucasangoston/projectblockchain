import { Box } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PostList } from './post/PostList';
import { RecommendedUsers } from './recommendation/recommendedUsers';
import { client } from '../../api/api';
import { getFeed } from '../../api/feed';
import { useRouter } from 'next/router';
import { PostFields } from '../../domain/PostFields';
import delay from 'delay';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const isMounted = useIsMounted();

  const profileId = '0x5a7a';

  useEffect(() => {
    void delay(3000).then(() => {
      if (isMounted()) fetchPosts();
    });
  }, [isMounted]);

  async function fetchPosts() {
    const response = await client.query({
      query: getFeed,
      variables: {
        profileId,
        limit: 50,
      },
    });
    setPosts(response.data.feed.items);
  }

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

function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
