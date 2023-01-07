import styles from './style/textPreview.module.css';
import { Button } from '@mui/material';
import * as React from 'react';
import { ConnectWalletButton } from '../../utils/button/connectWalletButton';

export function TextPreview() {
  return (
    <div className={styles.title}>
      <h1>
        Retrouver et partager avec les personnes possédant les mêmes NFT que
        vous.
      </h1>
      <ConnectWalletButton></ConnectWalletButton>
    </div>
  );
}
