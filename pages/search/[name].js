/* pages/index.js */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../../api/api'
import { searchProfiles, searchPublications } from '../../api/search'
import SearchTabs from '../../components/search/searchTabs'
import { PrimarySearchAppBar } from "../../components/navigationBar/navigationBar";
import { exploreProfiles } from '../../api/profile'
import { explorePublications } from '../../api/publication';
import { getUserNfts } from '../../api/nft';

export default function Search() {

  const [profiles, setProfiles] = useState([]);
  const [publications, setPublications] = useState([]);
  const router = useRouter();
  const { name } = router.query;
  useEffect(() => {
    if (name) {
      fetchWantedProfiles();
    }
  }, [name]);

  async function fetchWantedProfiles() {

    if (name != "emptyField") {
      const response = await client.query({
        query: searchProfiles,
        variables: {
          name,
          limit: 50,
        },
      });

      try {

        const profileData = await Promise.all(
          response.data.search.items.map(async (profileInfo) => {
            const profile = { ...profileInfo };
            const picture = profile.picture;
            if (picture && picture.original && picture.original.url) {
              if (picture.original.url.startsWith('ipfs://')) {
                const result = picture.original.url.substring(
                  7,
                  picture.original.url.length,
                );
                profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
              } else {
                profile.avatarUrl = picture.original.url;
              }
            }
            return profile;
          }),
        );
        setProfiles(profileData);
      } catch (err) {
        console.log({ err });
      }
    } else {

      const response = await client.query({
        query: exploreProfiles,
      });




      try {
        const profileData = await Promise.all(
          response.data.exploreProfiles.items.map(async (profileInfo) => {
            const profile = { ...profileInfo };
            const picture = profile.picture;
            if (picture && picture.original && picture.original.url) {
              if (picture.original.url.startsWith('ipfs://')) {
                const result = picture.original.url.substring(
                  7,
                  picture.original.url.length,
                );
                profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
              } else {
                profile.avatarUrl = picture.original.url;
              }
            }
            return profile;
          }),
        );
        setProfiles(profileData);
      } catch (err) {
        console.log({ err });
      }
    }

    if (name != "emptyField") {
      try {
        const response = await client.query({

          query: searchPublications,
          variables: { name, limit: 50 },
        });
        const publicationData = await Promise.all(
          response.data.search.items.map(async (publicationInfo) => {
            return { ...publicationInfo };
          }),
        );

        setPublications(publicationData);
      } catch (err) {
        console.log({ err });
      }
    } else {

      try {
        const response = await client.query({

          query: explorePublications,
        });
        const publicationData = await Promise.all(
          response.data.explorePublications.items.map(async (publicationInfo) => {
            return { ...publicationInfo };
          }),
        );

        setPublications(publicationData);
      } catch (err) {
        console.log({ err });
      }

    }

    const NftFilter = false;

    async function getMyNfts() {
      const address = "0x54be3a794282c030b15e43ae2bb182e14c409c5e";

      try {
        const response = await client.query({
          query: getUserNfts,
          variables: { address },
        });
        const nftsData = response.data.nfts.items;
        const mynftCollections = nftsData.map((nft) => nft.collectionName);
        return mynftCollections;


      } catch (err) {
        console.log('error to get nfts', err);
        return null
      }
    }

    const promiseMatchingProfiles = profiles.map(async (res) => {
      const myNftCollections = ["vMts meta"];////await getMyNfts();
      var matchingProfiles = [];
      const address = res.ownedBy;
      var containsSameCollections = false;
      try {
        const response = await client.query({
          query: getUserNfts,
          variables: { address },
        });

      
          const nftsData = response.data.nfts.items;

          const nftCollections = await nftsData.map((nft) => nft.collectionName);

           myNftCollections.forEach( collection => {
            if (nftCollections.includes(collection)) {
              containsSameCollections = true;
            }
          });

 

      console.log(containsSameCollections);
        return containsSameCollections; 

      } catch (err) {
        console.log('error to get nfts', err);
      }


    });
     
    const matchingProfilesBoolArray = await Promise.all(promiseMatchingProfiles);
    
    const matchingProfiles = profiles.filter((value, index) => matchingProfilesBoolArray[index]);
    console.log(matchingProfiles);
    if (NftFilter) {
      console.log("coucouuu");
      setProfiles(matchingProfiles);
    }
  

  }
  return (
    <div>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div className="pt-20">
        <SearchTabs profileName={name} profilesResults={profiles} publicationWord={name} publicationsResults={publications} />
      </div>
    </div>
  );
}
