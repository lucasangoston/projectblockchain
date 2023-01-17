import { Button, Grid } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { client } from '../../../api/api';
import { getUserNfts } from '../../../api/nft';
import { recommendedProfiles } from '../../../api/profile';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { blue, red } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import styles from './styles/recommendedUsers.module.css';
import { ethers } from 'ethers';
import ABI from '../../../abi/interaction.json';
import Link from 'next/link';

const address = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function RecommendedUsers() {


  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchRecommendedProfiles();
  }, []);

  async function fetchRecommendedProfiles() {
    try {
      /* fetch profiles from Lens API */
      const response = await client.query({ query: recommendedProfiles });
      setProfiles(response.data.recommendedProfiles);
    } catch (err) {
      console.log({ err });
    }


    try {
      /* fetch profiles from Lens API */
      const response = await client.query({ query: recommendedProfiles });
      setProfiles(response.data.recommendedProfiles);
    } catch (err) {
      console.log({ err });
    }

    const promiseMatchingProfiles = profiles.map(async (res: any) => {

      const myNftCollections = ['Lens Protocol Profiles']; // await getMyNfts(); Lens Protocol Profiles
      const address = res.ownedBy;
      var containsSameCollections = false;

      try {
        const response = await client.query({
          query: getUserNfts,
          variables: { address },
        });
        const nftsData = response.data.nfts.items;
        const nftCollections = await nftsData.map((nft: any) => nft.collectionName);
        console.log(nftCollections);
        myNftCollections.forEach((collection) => {
          if (nftCollections.includes(collection)) {
            containsSameCollections = true;
          }
        });

        return containsSameCollections;
      } catch (err) {
        console.log('error to get nfts', err);
      }
    });

    const matchingProfilesBoolArray = await Promise.all(
      promiseMatchingProfiles,
    );
    const matchingProfiles = await profiles.filter(
      (value, index) => matchingProfilesBoolArray[index],
    );
  setProfiles(matchingProfiles);
  }

  async function followUser(id: String) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(address, ABI, signer);

    try {
      const tx = await contract.follow([id], [0x0]);
      await tx.wait();
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className="fixed" style={{ width: '25vw' }}>
      <Card
        style={{
          borderRadius: '10px',
          overflow: 'auto',
          maxHeight: '51vh',
        }}
      >
        <CardHeader title={'Recommendations'} style={{ textAlign: 'center' }} />
        <CardContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              {profiles.map(({ id, name }) => {
                let avatar = '';
                if (!name) return;
                if (name) avatar = (name as string).slice(0, 1);
                return (
                  <div key={id} className={styles.recommendations}>
                    <Grid
                      key={id}
                      container
                      direction="row"
                      justifyContent={'space-between'}
                    >
                      <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        {avatar}
                      </Avatar>
                      <h2> {name} </h2>
                      <Link href={`./users/${id}`}>
                        <p className="cursor-pointer text-blue-600 text-lg font-medium text-center mt-2 mb-2">
                          View
                        </p>
                      </Link>
                      {/* <Button variant="outlined" size="small">
                        View
                      </Button> */}
                    </Grid>
                    <hr style={{ marginBottom: '10px', marginTop: '10px' }} />
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
