import { Button } from "@mui/material";
import { client } from "../../api/api";
import { defaultProfile, getMyProfiles, setDefaultProfile } from "../../api/profile";
import { ethers, utils } from 'ethers';
import ABI from '../../abi/interaction.json';
import { authenticate, challenge } from "../../api/authentication";
import { useEffect, useState } from "react";
import omitDeep from 'omit-deep';
import { ApolloClient, InMemoryCache } from '@apollo/client'

const addressA = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';

const API_URL = 'https://api-mumbai.lens.dev'

export function MyProfiles() {

  const [address, setAddress] = useState('');
  const [token, setToken] = useState();
  const [myProfiles, setMyProfiles] = useState([]);

  useEffect(() => {
    /* when the app loads, check to see if the user has already connected their wallet */
    checkConnection();
  }, []);


  const clientA = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

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

  async function changeDefaultProfile() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const userConnected = await signer.getAddress();

    const contract = new ethers.Contract(addressA, ABI, signer);

    await login();

    try {
      const returnedProfile = await clientA.mutate({
        mutation: setDefaultProfile,
        variables: {},
      });
      console.log(returnedProfile.data.createSetDefaultProfileTypedData.typedData);

      const result = returnedProfile.data.createSetDefaultProfileTypedData.typedData;

      const domain = result.domain;
      const types = result.types;
      const value = result.value;

      const profileId = result.value.profileId
      const wallet = result.value.wallet
      const deadline = result.value.deadline

      const signature = await signer._signTypedData(
        omitDeep(domain, ['__typename']),
        omitDeep(types, ['__typename']),
        omitDeep(value, ['__typename'])
      );

      const { v, r, s } = utils.splitSignature(signature);

      try {
        const tx = await contract.setDefaultProfileWithSig({
          profileId: profileId,
          wallet: wallet,
          sig: {
            v,
            r,
            s,
            deadline: deadline,
          },
        });
        await tx.wait();
        console.log('profile setted to default successfully', tx.hash);

      } catch (err) {
        console.log({ err });
      }

    } catch (err) {
      console.log('error changing default profile...', err);
    }

  }

  async function fetchMyProfiles() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const myAddress = await signer.getAddress();

    console.log(myAddress);

    try {
      const returnedProfiles = await client.query({
        query: getMyProfiles,
        variables: { address: myAddress },
      });
      console.log(returnedProfiles);

      const profiles = returnedProfiles.data.profiles.items;
      setMyProfiles(profiles);

    } catch (err) {
      console.log('error fetching profile...', err);
    }
  }

  return (
    <div>
      <Button onClick={fetchMyProfiles}>
        My Profiles
      </Button>
      
    </div>
  );
}