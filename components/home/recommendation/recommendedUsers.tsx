import { Button, Grid } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { client, recommendedProfiles } from '../../../api';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { blue, red } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import styles from './styles/recommendedUsers.module.css';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function RecommendedUsers() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchRecommendedProfiles();
  }, []);

  async function fetchRecommendedProfiles() {
    try {
      /* fetch profiles from Lens API */
      const response = await client.query({ query: recommendedProfiles });
      console.log(response.data);
      setProfiles(response.data.recommendedProfiles);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className="fixed" style={{ width: '400px' }}>
      <Card style={{ borderRadius: '10px', height: '500px' }}>
        <CardHeader title={'Recommendations'} style={{ textAlign: 'center' }} />
        <CardContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              {profiles.map(({ id, name }) => {
                let avatar = '';
                if (name) avatar = (name as string).slice(0, 1);
                return (
                  <div className={styles.recommendations}>
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
                      <Button variant="outlined" size="small">
                        Add
                      </Button>
                    </Grid>
                    <hr />
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
