import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../api/api';
import { getProfileById } from '../../api/profile';
import { getPublications } from '../../api/publication';
import { Grid } from '@mui/material';
import { CurrentUser } from '../../components/users/userDetails/currentUser';
import { PrimarySearchAppBar } from '../../components/navigationBar/navigationBar'
import { follower, following } from '../../api/profile';

export default function ProfileId() {
  const [profileData, setProfileData] = useState();
  const [pubs, setPubs] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollow] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchProfileById();
    }
  }, [id]);

  async function fetchProfileById() {
    try {
      const returnedProfileById = await client.query({
        query: getProfileById,
        variables: { id },
      });
      console.log(returnedProfileById);
      const data = { ...returnedProfileById.data.profile };
      /* format their picture if it is not in the right format */
      const picture = data.picture;
      if (picture || picture.original || picture.original.url) {
        if (picture.original.url.startsWith('ipfs://')) {
          let result = picture.original.url.substring(
            7,
            picture.original.url.length,
          );
          data.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
        } else {
          data.avatarUrl = data.picture.original.url;
        }
      }
      

      console.log(data);

      const publications = await client.query({
        query: getPublications,
        variables: {
          id: data.id,
          limit: 50,
        },
      });
      setPubs(publications.data.publications.items);

      const profileFollowing = await client.query({
        query: following,
        variables: {
          address: data.ownedBy,
          limit: 50,
        },
      });
      setFollowings(profileFollowing.data.following.items);

      console.log('followings : ', profileFollowing.data.following.items);

      const profileFollowers = await client.query({
        query: follower,
        variables: {
          profileId: data.id,
          limit: 50,
        },
      });
      if(profileFollowers.data.followers.items) setFollow(profileFollowers.data.followers.items);

      console.log('followers : ', profileFollowers.data.followers.items);

      var dataPlus = {data, followers, followings}

      console.log(dataPlus)
      setProfileData(dataPlus);

    } catch (err) {
      console.log('error fetching profile...', err);
    }
  }

  if (!profileData || !pubs) return null;

  return (
    <div className="flex flex-col justify-center items-center">
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div style={{ height:'7vh'}}></div>
      <Grid container>
        <Grid item md={3}>
          <Grid>
            <CurrentUser profileData={profileData}></CurrentUser>
          </Grid>
        </Grid>
        <Grid item md={9}>
          <div style={{ borderBottom: '1px solid grey', height: '15.3vh' }}>
            <h1
              style={{
                textAlign: 'center',
                fontSize: '30px',
                marginTop: '5vh',
              }}
            >
              NFT
            </h1>
          </div>
          <br />
          {pubs.map((pub) => (
            <div key={pub.id}>
              <p>{pub.metadata.content}</p>
            </div>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
