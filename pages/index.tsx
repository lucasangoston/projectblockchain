import Home from '../components/home/home';
import { PrimarySearchAppBar } from '../components/navigationBar/navigationBar';
import { Preview } from '../components/preview/preview';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export default function App() {

  const [address, setAddress] = useState('');

  useEffect(() => {
    /* when the app loads, check to see if the user has already connected their wallet */
    checkConnection();
  }, []);

  async function checkConnection() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (accounts.length) {
      setAddress(accounts[0]);
      return true
    }
  }
  
  if(address) {
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
