import FormControl from '@mui/material/FormControl';
import { Box, Button, TextField } from '@mui/material';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { ethers } from 'ethers'
import ABI from '../../../abi/createProfile.json'
import Link from 'next/link';
import { authenticate, challenge, client } from '../../../api';

const address = '0x420f0257D43145bb002E69B14FF2Eb9630Fc4736'

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
  const [token, setToken] = React.useState();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function changeUsername(event: any) {
    setUsername(event.target.value)
  }

  async function createNewProfile(handle: String) {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner()


    const userConnected = await signer.getAddress()

    const contract = new ethers.Contract(
      address,
      ABI,
      signer
    )

    console.log({ userConnected, address, handle, contract })

    try {
      const tx = await contract.proxyCreateProfile(
        {
          to: userConnected,
          handle: 'newprofiletest1',
          imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
          followModule: '0x0000000000000000000000000000000000000000',
          followModuleInitData: [],
          followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
        }
      )
      await tx.wait()
      console.log(tx)
      console.log("user successfully created")
    } catch (err) {
      console.log({ err })
    }
  }

  async function login() {
    try {
      /* first request the challenge from the API server */
      const challengeInfo = await client.query({
        query: challenge,
        variables: { address },
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      /* ask the user to sign a message with the challenge info returned from the server */
      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text,
      );
      /* authenticate the user */
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address,
          signature,
        },
      });
      /* if user authentication is successful, you will receive an accessToken and refreshToken */
      const {
        data: {
          authenticate: { accessToken },
        },
      } = authData;
      console.log({ accessToken });
      setToken(accessToken);
    } catch (err) {
      console.log('Error signing in: ', err);
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
            <Tab label="Déjà un compte" {...a11yProps(0)} />
            <Tab label="Créer un compte" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div style={{ textAlign: 'center' }}>
            <h2>Connexion</h2>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="email"
                variant="standard"
                style={{ marginTop: '30px' }}
              />
              <TextField
                id="outlined-basic"
                label="mot de passe"
                variant="standard"
                style={{ marginTop: '20px' }}
              />
              <Link href="./">
                <Button onClick={login} variant="contained" style={{ marginTop: '50px' }}>
                  Continue
                </Button>
              </Link>
            </FormControl>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div style={{ textAlign: 'center' }}>
            <h2>Inscription</h2>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Nom"
                variant="standard"
                style={{ marginTop: '30px' }}
                onChange={changeUsername}
                value={username}
              />
              {/* <TextField
                id="outlined-basic"
                label="Prenom"
                variant="standard"
                style={{ marginTop: '20px' }}
              />
              <TextField
                id="outlined-basic"
                label="email"
                variant="standard"
                style={{ marginTop: '30px' }}
              />
              <TextField
                id="outlined-basic"
                label="mot de passe"
                variant="standard"
                style={{ marginTop: '20px' }}
              /> */}
              //<Link href="./">
                <Button onClick={() => { createNewProfile(username); }} variant="contained" style={{ marginTop: '50px' }}>
                  Continue
                </Button>
              //</Link>

            </FormControl>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
