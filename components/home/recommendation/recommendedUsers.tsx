import { Button, Grid } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { client } from '../../../api/api';
import { getUserNfts } from '../../../api/nft';
import { recommendedProfiles } from '../../../api/profile';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { blue, red } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import styles from './styles/recommendedUsers.module.css';
import Link from 'next/link';

export function RecommendedUsers() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchRecommendedProfiles();
  }, []);

  async function fetchRecommendedProfiles() {
    try {
      /* fetch profiles from Lens API */
      const response = await client.query({ query: recommendedProfiles });
      setProfiles(response.data.recommendedProfiles);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className="fixed" style={{ width: '25vw' }}>
      <Card
        style={{
          borderRadius: '10px',
          overflow: 'auto',
          maxHeight: '51vh',
        }}
      >
        <CardHeader title={'Recommendations'} style={{ textAlign: 'center' }} />
        <CardContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              {profiles.map(({ id, name }) => {
                let avatar = '';
                if (!name) return;
                if (name) avatar = (name as string).slice(0, 1);
                return (
                  <div key={id} className={styles.recommendations}>
                    <Grid
                      key={id}
                      container
                      direction="row"
                      justifyContent={'space-between'}
                    >
                      <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        {avatar}
                      </Avatar>
                      <h2> {name} </h2>
                      <Link
                        href="./users/[id]"
                        as={`./users/${encodeURIComponent(id)}`}
                      >
                        <p className="cursor-pointer text-blue-600 text-lg font-medium text-center mt-2 mb-2">
                          View
                        </p>
                      </Link>
                      {/* <Button variant="outlined" size="small">
                        View
                      </Button> */}
                    </Grid>
                    <hr style={{ marginBottom: '10px', marginTop: '10px' }} />
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
