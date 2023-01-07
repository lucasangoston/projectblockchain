import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { SearchIcon } from '@chakra-ui/icons';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { AttachFile, EmojiEmotions } from '@mui/icons-material';
import { TextField } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import * as React from 'react';
import styles from './style/chat.module.css';

export function Chat() {
  return (
    <div className={styles.container}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              L
            </Avatar>
          }
          action={
            <div>
              <IconButton aria-label="settings">
                <SearchIcon></SearchIcon>
              </IconButton>
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            </div>
          }
          title="Lucas Angoston"
          subheader="cliquer ici pour avoir les infos du contact"
        />
        <CardContent
          style={{
            backgroundColor: '#f0ecea',
            height: '81vh',
            maxHeight: '81vh',
            overflow: 'auto',
          }}
        >
          <Card
            className={styles.messageConnectedUser}
            style={{ borderRadius: '10px' }}
          >
            <CardContent
              style={{
                backgroundColor: '#3BDD00',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum
              </Typography>
            </CardContent>
          </Card>

          <Card
            className={styles.messageUser}
            style={{
              borderRadius: '10px',
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Salut !
              </Typography>
            </CardContent>
          </Card>

          <Card
            className={styles.messageUser}
            style={{
              borderRadius: '10px',
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Bien ou quoi ?
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
        <CardActions>
          <IconButton aria-label="emoji">
            <EmojiEmotions></EmojiEmotions>
          </IconButton>
          <IconButton aria-label="attach file">
            <AttachFile></AttachFile>
          </IconButton>
          <TextField
            style={{ width: '100%' }}
            id="outlined-basic"
            label="Taper un message"
            variant="outlined"
          />
          <IconButton
            aria-label="attach file"
            style={{ marginLeft: 'auto', marginRight: 'Opx' }}
          >
            <MicIcon></MicIcon>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
