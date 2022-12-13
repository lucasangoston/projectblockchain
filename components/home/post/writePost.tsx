import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import { Button, Grid, TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';

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

export function WritePost() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{ borderRadius: '10px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            L
          </Avatar>
        }
        title="Lucas Angoston"
      />
      <CardContent>
        <TextField
          style={{ textAlign: 'center', width: '100%', height: '100%' }}
          placeholder="Quoi de neuf Lucas ?"
          sx={{ input: { color: 'red' } }}
          multiline
          rows={4}
          maxRows={4}
        />
      </CardContent>
      <CardActions>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Button startIcon={<ImageIcon />} style={{ color: '#F50632' }}>
            <h6 style={{ color: 'black' }}> Photo </h6>
          </Button>
          <Button startIcon={<VideocamIcon />} style={{ color: '#1CE627' }}>
            <h6 style={{ color: 'black' }}> Vidéo </h6>
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
