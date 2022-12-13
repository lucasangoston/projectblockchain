/* pages/index.js */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../../api/api'
import { searchProfiles } from '../../api/search'
import Link from 'next/link'

export default function SearchProfiles() {
  const [profiles, setProfiles] = useState([]);
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
  }
  return (
    <div className="pt-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl mb-6 font-bold">Results : </h1>
        {profiles.map(
          ({ avatarUrl, bio, handle, id, name, stats: { totalFollowers } }) => (
            <div
              key={id}
              className="w-2/3 shadow-md p-6 rounded-lg mb-8 flex flex-col items-center"
            >
              <img
                className="w-48"
                src={avatarUrl || 'https://picsum.photos/200'}
              />
              <p className="text-xl text-center mt-6">{name}</p>
              <p className="text-base text-gray-400  text-center mt-2">{bio}</p>
              <Link href={`/profile/${handle}`}>
                <p className="cursor-pointer text-violet-600 text-lg font-medium text-center mt-2 mb-2">
                  {handle}
                </p>
              </Link>
              <p className="text-pink-600 text-sm font-medium text-center">
                {totalFollowers} followers
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
