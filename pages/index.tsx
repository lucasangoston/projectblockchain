import Home from '../components/home/home';
import { PrimarySearchAppBar } from '../components/navigationBar/navigationBar';
import { Preview } from '../components/preview/preview';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

// import { WagmiConfig } from 'wagmi'
// import { useAccount, useConnect } from 'wagmi';

export default function App() {

  const [address, setAddress] = useState('');
  //const [isConnectedUser, setConnectedUser] = useState(false);


  useEffect(() => {
    /* when the app loads, check to see if the user has already connected their wallet */
    checkConnection();
  }, []);

  // console.log(global.isConnected);

  async function checkConnection() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (accounts.length) {
      setAddress(accounts[0]);
      global.isConnected = true;
      return true
    }
  }

  console.log('global connected : ', globalThis.isConnected)
 

  
  if(global.isConnected) {
    return (
      <div style={{ backgroundColor: '#f8f9fa' }}>
        <PrimarySearchAppBar></PrimarySearchAppBar>
        <div style={{ margin: 70 }}>
          <Home></Home>
        </div>
      </div>
      
    );
  } else {
    return <Preview></Preview>
  }

  
}
