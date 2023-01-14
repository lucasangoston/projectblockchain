import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../api/api';
import { getProfileById } from '../../api/profile';
import { getPublications } from '../../api/publication';
import { Grid } from '@mui/material';
import { CurrentUser } from '../../components/users/userDetails/currentUser';

export default function ProfileId() {
  const [profileData, setProfileData] = useState();
  const [pubs, setPubs] = useState([]);

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
      setProfileData(data);

      const publications = await client.query({
        query: getPublications,
        variables: {
          id: data.id,
          limit: 50,
        },
      });
      setPubs(publications.data.publications.items);

      console.log('pubs : ', publications);
    } catch (err) {
      console.log('error fetching profile...', err);
    }
  }

  if (!profileData || !pubs) return null;

  return (
    <div className="flex flex-col justify-center items-center">
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
