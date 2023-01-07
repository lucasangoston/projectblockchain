import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import * as React from 'react';
import { Contact } from '../contact/contact';

export function ContactList() {
  return (
    <Card style={{ position: 'fixed', width: '25vw' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            L
          </Avatar>
        }
        action={
          <div>
            <IconButton aria-label="more items">
              <MoreVertIcon />
            </IconButton>
          </div>
        }
      />
      <hr />
      <CardContent
        style={{ height: '90vh', overflow: 'auto', maxHeight: '90vh' }}
      >
        <Contact></Contact>
        <Contact></Contact>
        <Contact></Contact>
      </CardContent>
    </Card>
  );
}
