/* pages/profile/[handle].js */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../api/api';
import { getUserNfts } from '../../api/nft';

import { NftList } from '../../components/nfts/nftList';
import { EmptyResult } from '../../components/nfts/emptyResult';
import { PrimarySearchAppBar } from "../../components/navigationBar/navigationBar";

//test with address : 0x54be3a794282c030b15e43ae2bb182e14c409c5e

export default function UserNfts() {

  const [nfts, setNfts] = useState([]);
  const router = useRouter();
  const { address } = router.query;

  useEffect(() => {
    if (address) {
      fetchUserNfts();
    }
  }, [address]);

  async function fetchUserNfts() {
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

  if (!nfts) return null;

  return (
    <div>
      <PrimarySearchAppBar/>
    <div className="pt-20">
      {nfts.length > 0 ?
      <NftList nfts={nfts}/>: 
      <EmptyResult/>}
    </div>
    </div>
    
  );
}
