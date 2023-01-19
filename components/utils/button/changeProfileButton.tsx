import { Button, Link } from '@mui/material';
import * as React from 'react';
import { authenticate, challenge } from '../../../api/authentication';
import { client } from '../../../api/api';
import {
  defaultProfile,
  getMyProfiles,
  setDefaultProfile,
} from '../../../api/profile';
import { ethers, utils } from 'ethers';
import ABI from '../../../abi/interaction.json';
import omitDeep from 'omit-deep';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { omit } from 'superstruct';

const addressA = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';

const API_URL = 'https://api-mumbai.lens.dev';

export function ChangeProfileButton(id: any) {
  const accessToken = localStorage.getItem('accessTocken');

  useEffect(() => {
    /* when the app loads, check to see if the user has already connected their wallet */
  }, []);

  const clientA = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });

  return (
    <div>
      <Button
        style={{
          backgroundColor: '#ffffff',
          color: '#000000',
        }}
        variant="contained"
        onClick={changeDefaultProfile}
      >
        <ArrowCircleRightIcon></ArrowCircleRightIcon>
      </Button>
    </div>
  );

  async function changeDefaultProfile() {
    /*
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(addressA, ABI, signer);

    try {
      const returnedProfile = await clientA.mutate({
        mutation: setDefaultProfile,
        variables: { profileId: id },
      });

      const result =
        returnedProfile.data.createSetDefaultProfileTypedData.typedData;

      const domain = result.domain;
      const types = result.types;
      const value = result.value;

      const profileId = result.value.profileId;
      const wallet = result.value.wallet;
      const deadline = result.value.deadline;

      const signature = await signer._signTypedData(
        omitDeep(domain, ['__typename']),
        omitDeep(types, ['__typename']),
        omitDeep(value, ['__typename']),
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
      } catch (err) {
        console.log({ err });
      }
    } catch (err) {
      console.log('error changing default profile...', err);
    }

     */
  }
}
