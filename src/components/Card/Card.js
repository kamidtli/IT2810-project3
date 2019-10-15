import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';


const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
}));

export default function MediaCard(props) {
  const classes = useStyles();
  const [cardInfo] = useState(props);

  return (
    <Card className={classes.card}>
      <Link
        to={`/movie/${cardInfo.id}`}
        className={classes.link}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={cardInfo.imgUrl}
            title={cardInfo.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <Truncate lines={2} ellipsis={<span>...</span>}>
                {cardInfo.title}
              </Truncate>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <Truncate lines={2} ellipsis={<span>...</span>}>
                {cardInfo.shortDescription}
              </Truncate>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className={classes.actions}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
