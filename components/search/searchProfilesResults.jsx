import * as React from 'react';
import Link from 'next/link';
import { EmptyResults } from './emptyResults';

export function SearchProfilesResults({ name, results }) {
  return results.length != 0 ? (
    <div className="flex flex-col justify-center items-center">
      {results.map(
        ({
          avatarUrl,
          bio,
          handle,
          profileId,
          name,
          stats: { totalFollowers },
        }) => (
          <div
            key={profileId}
            className="w-2/3 shadow-md p-6 rounded-lg mb-8 flex flex-col items-center"
          >
            <img
              className="w-48"
              src={avatarUrl || 'https://picsum.photos/200'}
            />
            <p className="text-xl text-center mt-6">{name}</p>
            <p className="text-base text-gray-400  text-center mt-2">{bio}</p>
            <Link href={`/users/${profileId}`}>
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
  ) : (
    <EmptyResults name={name}></EmptyResults>
  );
}
