import * as React from 'react';
import Link from 'next/link';

export function EmptyResults({ name }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>No results</h1>  
    </div>
  );
}
