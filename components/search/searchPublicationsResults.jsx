import * as React from 'react';
import Link from 'next/link';
import { EmptyResults } from './emptyResults';

export function SearchPublicationsResults({ name, results }) {
  return results.length != 0 ? (
    <div className="flex flex-col justify-center items-center">
      {results.map((pub) => (
        <div key={pub.id} className="shadow p-10 rounded mb-8 w-2/3">
          <div className="flex">
            {' '}
            <img
              className="w-6 rounded mr-4"
              src={pub.profile.avatarUrl || 'https://picsum.photos/200'}
            />
            <Link href={`/users/${pub.profile.profileId}`}>
              {pub.profile.name}
            </Link>
          </div>

          <p>{pub.metadata.content}</p>
        </div>
      ))}
    </div>
  ) : (
    <EmptyResults name={name}></EmptyResults>
  );
}
