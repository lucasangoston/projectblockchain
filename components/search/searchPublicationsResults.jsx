
import * as React from 'react';
import Link from 'next/link';

export function SearchPublicationsResults({word, results}) {
  return (
    <div className="flex flex-col justify-center items-center">        
      <h1 className="text-5xl mb-6 font-bold">Results for {word}: </h1>
        {results.map((pub) => (
          <div key={pub.id} className="shadow p-10 rounded mb-8 w-2/3">
            <p>{pub.metadata.content}</p>
          </div>
        ))}
      </div>
  );
}
