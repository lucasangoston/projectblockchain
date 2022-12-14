import * as React from 'react';
import { useState } from 'react';
import { client } from '../../api/api';
import { getProfileById } from '../../api/profile';
import { getPublications } from '../../api/publication';
import { PrimarySearchAppBar } from '../../components/navigationBar/navigationBar';
import { Profile } from '../../components/profile/profile';
import { getUserNfts } from '../../api/nft';

const address1 = '0x54be3a794282c030b15e43ae2bb182e14c409c5e'; //"0x60Ae865ee4C725cd04353b5AAb364553f56ceF82"
const address = '0x54be3a794282c030b15e43ae2bb182e14c409c5e';

export default function ProfilePage() {
  const [profile, setProfile] = useState();
  const [nft, setNfts] = useState([]);
  const [pubs, setPubs] = useState([]);

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  async function fetchProfile() {
    try {
      const returnedProfileById = await client.query({
        query: getProfileById,
        variables: { id: '0x01' },
      });
      console.log(returnedProfileById);
      const data = { ...returnedProfileById.data.profile };
      /* format their picture if it is not in the right format */
      const picture = data.picture;
      if (picture || picture.original || picture.original.url) {
        if (picture.original.url.startsWith('ipfs://')) {
          const result = picture.original.url.substring(
            7,
            picture.original.url.length,
          );
          data.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
        } else {
          data.avatarUrl = data.picture.original.url;
        }
      }
      setProfile(data);
      const publications = await client.query({
        query: getPublications,
        variables: {
          id: data.id,
          limit: 50,
        },
      });
      setPubs(publications.data.publications.items);
    } catch (err) {
      console.log('error fetching profile...', err);
    }
    try {
      const response = await client.query({
        query: getUserNfts,
        variables: { address },
      });
      const nftsData = response.data.nfts.items;

      setNfts(nftsData);
    } catch (err) {
      console.log('error to get nfts', err);
    }
  }

  // if (!profile || !pubs) return null;

  return (
    <div>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div style={{ marginTop: 100 }}>
        <Profile nft={nft}></Profile>
      </div>
    </div>
  );
}
