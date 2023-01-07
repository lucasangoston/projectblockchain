import * as React from 'react';
import Link from 'next/link';

export function EmptyResults({ name }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl mb-6 font-bold">Results : </h1>
      <h1>No results</h1>
    </div>
  );
}
