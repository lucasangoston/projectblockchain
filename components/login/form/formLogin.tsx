import FormControl from '@mui/material/FormControl';
import { Box, Button, TextField } from '@mui/material';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { ethers } from 'ethers'
import ABI from '../../../abi.json'

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
  const [profile, setProfile] = React.useState('');
  const [username, setUsername] = React.useState('');

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
          handle: handle.toString(),
          imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
          followModule: '0x0000000000000000000000000000000000000000',
          followModuleInitData: [],
          followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
        }
      )
      await tx.wait()
      console.log("user successfully created")
    } catch (err) {
      console.log({ err })
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

              <Button variant="contained" style={{ marginTop: '50px' }}>
                Continue
              </Button>
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
              <Button onClick={() => {createNewProfile(username);}} variant="contained" style={{ marginTop: '50px' }}>
                Continue
              </Button>
            </FormControl>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
