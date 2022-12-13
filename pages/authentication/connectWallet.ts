import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { client } from '../../api/api'
import { challenge, authenticate } from '../../api/authentication'
import Link from 'next/link'

export default function Connect() {
  /* local state variables to hold user's address and access token */
  const [address, setAddress] = useState('');
  const [token, setToken] = useState();
  useEffect(() => {
    /* when the app loads, check to see if the user has already connected their wallet */
    checkConnection();
  }, []);

  async function checkConnection() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (accounts.length) {
      setAddress(accounts[0]);
    }
  }

  async function connect() {
    /* this allows the user to connect their wallet */
    const account = await window.ethereum.send('eth_requestAccounts');
    if (account.result.length) {
      setAddress(account.result[0]);
    }
  }
}
