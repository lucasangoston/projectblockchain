import { Button, Link } from '@mui/material';
import * as React from 'react';
import { authenticate, challenge, client } from '../../../api';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export function ConnectWalletButton() {
  const [address, setAddress] = useState('');
  const [token, setToken] = useState();

  useEffect(() => {
    /* when the app loads, check to see if the user has already connected their wallet */
    checkConnection();
  }, []);

  console.log(global.isConnected);


  return (
    <div>
      {!address && <Button
        style={{
          backgroundColor: '#ffffff',
          color: '#000000',
        }}
        variant="contained"
        onClick={connect}
      >
        Connexion Wallet
      </Button>}
      {address && !token && (

        <Button
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
          }}
          variant="contained"
          onClick={login}
        >
          <Link href={'/'}> Hello </Link>
        </Button>
      )}
      
        
      
    </div>
  );

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
      globalThis.isConnected = true;
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
}
