/* pages/index.js */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../../api/api'
import { searchProfiles, searchPublications } from '../../api/search'
import Link from 'next/link'
import SearchTabs from '../../components/search/searchTabs'

export default function Search() {
  const [profiles, setProfiles] = useState([]);
  const [publications, setPublications] = useState([]);
  const router = useRouter();
  const { name } = router.query;
  useEffect(() => {
    if (name) {
      fetchWantedProfiles();
    }
  }, [name]);
  async function fetchWantedProfiles() {
    try {
      const response = await client.query({
        query: searchProfiles,
        variables: {
          name,
          limit: 50,
        },
      });
      const profileData = await Promise.all(
        response.data.search.items.map(async (profileInfo) => {
          const profile = { ...profileInfo };
          const picture = profile.picture;
          if (picture && picture.original && picture.original.url) {
            if (picture.original.url.startsWith('ipfs://')) {
              const result = picture.original.url.substring(
                7,
                picture.original.url.length,
              );
              profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
            } else {
              profile.avatarUrl = picture.original.url;
            }
          }
          return profile;
        }),
      );
      setProfiles(profileData);
    } catch (err) {
      console.log({ err });
    }

    try {
      const response = await client.query({
        
        query: searchPublications,
        variables: { name, limit: 50 },
      });
      const publicationData = await Promise.all(
        response.data.search.items.map(async (publicationInfo) => {
          return { ...publicationInfo };
        }),
      );

      setPublications(publicationData);
    } catch (err) {
      console.log({ err });
    }
    
  }
  return (
    <div className="pt-20">
      <SearchTabs profileName={name} profilesResults={profiles} publicationWord={name} publicationsResults={publications}></SearchTabs>
    </div>
  );
}
