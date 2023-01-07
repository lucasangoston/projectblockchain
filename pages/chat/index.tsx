import * as React from 'react';
import { Chat } from '../../components/chat/chat';
import { ContactList } from '../../components/chat/contact';
import { Grid } from '@mui/material';

export default function ChatApp() {
  return (
    <Grid container direction="row">
      <Grid item md={3}>
        <ContactList></ContactList>
      </Grid>
      <Grid item md={9}>
        <Chat></Chat>
      </Grid>
    </Grid>
  );
}
