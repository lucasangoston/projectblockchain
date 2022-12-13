import { useState, useEffect } from 'react';
import { client, recommendedProfiles } from '../../api';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RecommendedProfiles() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchRecommendedProfiles();
  }, []);

  async function fetchRecommendedProfiles() {
    try {
      /* fetch profiles from Lens API */
      const response = await client.query({ query: recommendedProfiles });
      console.log(response.data);
      setProfiles(response.data.recommendedProfiles);
    } catch (err) {
      console.log({ err });
    }
  }
  return (
    <div className="pt-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl mb-6 font-bold"> Recommended profiles 🌿 </h1>
      </div>
      {profiles.map(({ bio, id, name }) => (
        <div key={id} className="flex flex-col justify-center items-center">
          <div className="shadow p-10 rounded mb-8 w-2/3">
            <p className="text-xl text-center mt-6">{name}</p>
            <Link href={`./details/${id}`}>
              <p className="cursor-pointer text-violet-600 text-lg font-medium text-center mt-2 mb-2">
                {id}
              </p>
            </Link>
            <p className="text-base text-gray-400  text-center mt-2">{bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
