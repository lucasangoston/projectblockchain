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
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CurrentUser profileData={profileData}></CurrentUser>
        </Grid>
        <Grid item xs={9}>
          {pubs.map((pub) => (
            <div key={pub.id} className="shadow p-10 rounded mb-8 w-2/3">
              <p>{pub.metadata.content}</p>
            </div>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
