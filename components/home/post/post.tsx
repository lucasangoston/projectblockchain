import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Grid } from '@mui/material';
import { PostFields } from '../../../domain/PostFields';
import { CommentFields } from '../../../domain/CommentFields';

interface Props {
  post: PostFields;
  comments: CommentFields[];
}

export function Post({ post, comments }: Props) {
  console.log(comments);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{ borderRadius: '10px' }} className="m-4">
      <div className="flex flex-row">
        {post.profile.picture != null ? (
          <img
            className="w-10 h-10 rounded-full m-4"
            //src={post.post.profile.picture != null ? post.post.profile.picture.original.url : 'https://picsum.photos/200'}
            src={
              post.profile.picture != null
                ? post.profile.picture.original.url.startsWith('ipfs://')
                  ? `http://lens.infura-ipfs.io/ipfs/${post.profile.picture.original.url.substring(
                      7,
                      post.profile.picture.original.url.length,
                    )}`
                  : post.profile.picture.original.url
                : 'https://picsum.photos/200'
            }
          />
        ) : (
          <Avatar
            className="w-10 h-10 rounded-full m-4"
            sx={{ bgcolor: blue[500] }}
            aria-label="recipe"
          >
            {post.profile.name != null
              ? (post.profile.name as string).slice(0, 1)
              : ' '}
          </Avatar>
        )}
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.profile.name}
          subheader={new Date(post.createdAt).toString().split('GMT')[0]}
        />
      </div>

      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          className="text-[16px]"
        >
          {post.metadata.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="add to favorites">
            <ChatBubbleIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Grid>
      </CardActions>
      <hr />
      <Grid
        container
        spacing={3}
        direction="column"
        justifyContent="left"
        alignItems="left"
      >
        <Grid item md={50}>
          {comments.map((comment) => {
            return (
              <Card
                key={comment.id}
                style={{ borderRadius: '10px' }}
                className="m-4"
              >
                <div className="flex flex-col m-4">
                  <div>{comment.profile.name}</div>
                  <div>
                    {new Date(comment.createdAt).toString().split('GMT')[0]}
                  </div>
                </div>

                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-[14px] text-black"
                  >
                    {comment.metadata.content}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    </Card>
  );
}
