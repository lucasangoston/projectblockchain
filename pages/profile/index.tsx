import Link from 'next/link';
import * as React from 'react';

export default function Profile() {
  return (
    <div>
      <h2>dodo</h2>
      <h1>
        <Link href={'./'}>Accueil</Link>
      </h1>
    </div>
  );
}
