/* pages/profile/[handle].js */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../api/api';
import { getProfile } from '../../api/profile';
import { getPublications } from '../../api/publication';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ethers } from 'ethers';
import ABI from '../../abi/interaction.json';

const address = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';



export default function Profile() {
  /* create initial state to hold user profile and array of publications */
  const [profile, setProfile] = useState();
  const [publications, setPublications] = useState([]);
  /* using the router we can get the lens handle from the route param */
  const router = useRouter();
  const { handle } = router.query;

  useEffect(() => {
    if (handle) {
      fetchProfile();
    }
  }, [handle]);

  async function fetchProfile() {
    try {
      /* fetch the user profile using their handle */
      const returnedProfile = await client.query({
        query: getProfile,
        variables: { handle },
      });

      const profileData = { ...returnedProfile.data.profile };
      /* format their picture if it is not in the right format */
      const picture = profileData.picture;
      if (picture && picture.original && picture.original.url) {
        if (picture.original.url.startsWith('ipfs://')) {
          const result = picture.original.url.substring(
            7,
            picture.original.url.length,
          );
          profileData.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
        } else {
          profileData.avatarUrl = profileData.picture.original.url;
        }
      }
      setProfile(profileData);
      /* fetch the user's publications from the Lens API and set them in the state */
      const pubs = await client.query({
        query: getPublications,
        variables: {
          id: profileData.id,
          limit: 50,
        },

      });
      console.log('coucouuuu');
      setPublications(pubs.data.publications.items);

    } catch (err) {
      console.log('error fetching profile...', err);
    }
  }

  if (!profile) return null;

  async function followUser() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(address, ABI, signer);
  
    try {
      const tx = await contract.follow([profile.id], [0x0]);
      await tx.wait();
      console.log('followed user successfully');
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className="pt-20">
      <div className="flex flex-col justify-center items-center">
        <IconButton aria-label="settings">
          <PersonAddIcon onClick={followUser}></PersonAddIcon>
        </IconButton>
        <img className="w-64 rounded-full" src={profile.avatarUrl} />
        <p className="text-4xl mt-8 mb-8">{profile.handle}</p>
        <p className="text-center text-xl font-bold mt-2 mb-2 w-1/2">
          {profile.bio}
        </p>
        {publications.map((pub) => (
          <div key={pub.id} className="shadow p-10 rounded mb-8 w-2/3">
            <p>{pub.metadata.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
