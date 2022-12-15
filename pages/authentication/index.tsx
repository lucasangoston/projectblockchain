import Head from "next/head";
import * as React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {  client } from "../../api/api";
import { authenticate, challenge } from "../../api/authentication";
import LoginForm from "../../components/authentication/login_form";

export default function LoginPage() {
  const [address, setAddress] = React.useState('');
  const [token, setToken] = React.useState();

  async function Login() {
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
    <div style={{ marginTop: 100 }}>
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginForm />
      </main>
    </div>
  );
}
