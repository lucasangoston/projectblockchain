import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../api/api';
import { getProfileById } from '../../api/profile';
import { getPublications } from '../../api/publication';
import { Grid } from '@mui/material';
import { CurrentUser } from '../../components/users/userDetails/currentUser';
import { PrimarySearchAppBar } from '../../components/navigationBar/navigationBar';
import { follower, following } from '../../api/profile';
import { getUserNfts } from '../../api/nft';
import { NftList } from '../../components/nfts/nftList';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProfileId() {
  const [profileData, setProfileData] = useState();
  const [pubs, setPubs] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollow] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [value, setValue] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id) {
      fetchProfileById();
    }
  }, [id]);

  async function fetchProfileById() {
    try {
      const returnedProfileById = await client.query({
        query: getProfileById,
        variables: { id },
      });
      const data = { ...returnedProfileById.data.profile };
      /* format their picture if it is not in the right format */
      const picture = data.picture;
      if (picture || picture.original || picture.original.url) {
        if (picture.original.url.startsWith('ipfs://')) {
          const result = picture.original.url.substring(
            7,
            picture.original.url.length,
          );
          data.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
        } else {
          data.avatarUrl = data.picture.original.url;
        }
      }

      const publications = await client.query({
        query: getPublications,
        variables: {
          id: data.id,
          limit: 50,
        },
      });
      setPubs(publications.data.publications.items);

      const response = await client.query({
        query: getUserNfts,
        variables: {
          address: data.ownedBy,
        },
      });
      const nftsData = response.data.nfts.items;

      setNfts(nftsData);

      const profileFollowing = await client.query({
        query: following,
        variables: {
          address: data.ownedBy,
          limit: 50,
        },
      });
      setFollowings(profileFollowing.data.following.items);

      const profileFollowers = await client.query({
        query: follower,
        variables: {
          profileId: data.id,
          limit: 50,
        },
      });
      if (profileFollowers.data.followers.items)
        setFollow(profileFollowers.data.followers.items);

      var dataPlus = { data, followers, followings };

      setProfileData(dataPlus);
    } catch (err) {
      console.log('error fetching profile...', err);
    }
  }

  if (!profileData || !pubs || !nfts) return null;
  return (
    <div className="flex flex-col justify-center items-center">
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div style={{ height: '7vh', marginTop: 50 }}></div>
      <Grid container>
        <Grid item md={3}>
          <Grid>
            <CurrentUser profileData={profileData}></CurrentUser>
          </Grid>
        </Grid>
        <Grid item md={9}>
          <Box sx={{ ml: '2rem' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Publications" {...a11yProps(0)} />
                <Tab label="NFTs" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {pubs.map((pub) => {
                if (!pub.metadata.content) return;
                return (
                  <div key={pub.id}>
                    <Card>
                      <CardContent>{pub.metadata.content}</CardContent>
                    </Card>
                    <br />
                  </div>
                );
              })}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <NftList nfts={nfts} />
            </TabPanel>
          </Box>
          {/* {nfts.map((nft) => (
            <div>
              <p>{nft.collectionName}</p>
            </div>
          ))} */}
        </Grid>
      </Grid>
    </div>
  );
}
