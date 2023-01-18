import Link from 'next/link';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { client } from '../../api/api';
import { PrimarySearchAppBar } from '../../components/navigationBar/navigationBar';
import { Profile } from '../../components/profile/profile';
import { getUserNfts } from '../../api/nft';

const address = '0x54be3a794282c030b15e43ae2bb182e14c409c5e';

export default function ProfilePage() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetchNft();
  }, []);

  async function fetchNft() {
    try {
      const response = await client.query({
        query: getUserNfts,
        variables: { address },
      });
      const nftsData = response.data.nfts.items;

      setNfts(nftsData);
    } catch (err) {
      console.log('error to get nfts', err);
    }
  }

  return (
    <div>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div style={{ marginTop: 100 }}>
        <Profile nft={nfts}></Profile>
      </div>
    </div>
  );
}
