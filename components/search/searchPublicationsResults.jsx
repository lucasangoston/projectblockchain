
import * as React from 'react';
import Link from 'next/link';
import { EmptyResults } from './emptyResults'

export function SearchPublicationsResults({name, results}) {
  return results.length != 0 ? (
    <div className="flex flex-col justify-center items-center">        
      <h1 className="text-5xl mb-6 font-bold">Results for {name != "emptyField" ? name : "all publications"}: </h1>
        {results.map((pub) => (
          <div key={pub.id} className="shadow p-10 rounded mb-8 w-2/3">
            <div className='flex'> <img
                className="w-6 rounded mr-4"
                src={pub.profile.metadata.scalar || 'https://picsum.photos/200'}
              />
            <Link href={`/profile/${pub.profile.handle}`}>{pub.profile.name}</Link></div>
         
            <p>{pub.metadata.content}</p>
          </div>
        ))}
      </div>
  ) : <EmptyResults name={name}></EmptyResults>;
}
