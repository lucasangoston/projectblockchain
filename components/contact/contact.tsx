import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import * as React from 'react';
import styles from '../contact/style/contact.module.css';

export function Contact() {
  function displayContactMessage() {
    console.log('click');
  }

  return (
    <div onClick={displayContactMessage} className={styles.contact}>
      <Grid container direction="row">
        <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe"></Avatar>
        <ol style={{ marginLeft: '10px' }}>
          <h2 style={{ textTransform: 'capitalize' }}> prenom du mec </h2>
          <p style={{ color: 'grey', fontSize: '15px' }}>
            {' '}
            dernier message visible{' '}
          </p>
        </ol>
      </Grid>
      <hr style={{ marginBottom: '10px', marginTop: '10px' }} />
    </div>
  );
}
