import Home from '../components/home/home';
import { PrimarySearchAppBar } from '../components/navigationBar/navigationBar';
import { Preview } from '../components/preview/preview';
import { ethers } from 'ethers';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function App() {
  let accessToken;

  

  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken');
  }

  if (accessToken) {
    return (
      <div style={{ backgroundColor: '#f8f9fa' }}>
        <PrimarySearchAppBar></PrimarySearchAppBar>
        <div style={{ margin: 70 }}>
          <Home></Home>
        </div>
      </div>
    );
  } else {
    return <Preview></Preview>;
  }
}
