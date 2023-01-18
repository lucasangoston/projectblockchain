import FormControl from '@mui/material/FormControl';
import { Box, Button, TextField } from '@mui/material';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { ethers } from 'ethers';
import ABI from '../../../abi/createProfile.json';
import Link from 'next/link';
import { authenticate, challenge, client } from '../../../api';
import { ContentPasteSearchOutlined } from '@mui/icons-material';

const address = '0x420f0257D43145bb002E69B14FF2Eb9630Fc4736';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function FormLogin() {
  const [value, setValue] = React.useState(0);
  const [username, setUsername] = React.useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  async function createNewProfile() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const userConnected = await signer.getAddress();

    const contract = new ethers.Contract(address, ABI, signer);

    console.log({ userConnected, address, contract });

    try {
      const tx = await contract.proxyCreateProfile({
        to: userConnected,
        handle: username,
        imageURI:
          'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
        followModule: '0x0000000000000000000000000000000000000000',
        followModuleInitData: [],
        followNFTURI:
          'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
      });
      await tx.wait();
      console.log(tx);
      console.log('user successfully created');
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>My NFT Friend</h1>
      <Box sx={{ width: '100%', marginTop: '50px' }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Créer un compte" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div style={{ textAlign: 'center' }}>
            <h2>Inscription</h2>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Nom"
                variant="standard"
                style={{ marginTop: '30px' }}
                onChange={(value) => {
                  if (value.target.value != '') {
                    setUsername(value.target.value);
                    console.log(username);
                  } else {
                    setUsername('');
                  }
                }}
                value={username}
              />
              <Link href="./">
                <Button
                  onClick={() => {
                    if (username != '') createNewProfile();
                    else return;
                  }}
                  variant="outlined"
                  style={{ marginTop: '50px' }}
                >
                  Continue
                </Button>
              </Link>
            </FormControl>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
