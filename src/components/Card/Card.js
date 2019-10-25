import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardActionArea, CardActions, CardContent, CardMedia, Typography,
} from '@material-ui/core/';
import Star from '@material-ui/icons/Stars';
import { Link } from 'react-router-dom';
import WatchlistButton from '../WatchlistButton/WatchlistButton';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    maxWidth: 345,
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 150,
  },
  actions: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  spacer: {
    flexGrow: 1,
  },
  rating: {
    margin: 0,
  },
  ratingIcon: {
    padding: theme.spacing(1),
  },
}));

/**
 * Card component for showing a movie card
 * @param {*} props
 * Props is data it gets from the Redux store
 */

function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Link
        to={`/movie/${props.id}`}
        className={`${classes.link} ${classes.spacer}`}
        onClick={() => (props.addCurrentId(props.id))}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={
              props.imgUrl
              || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1340&q=80'
            }
            title={props.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.shortDescription || 'Not available'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className={classes.actions}>
        <Star className={classes.ratingIcon} />
        <Typography gutterBottom className={classes.rating}>
          {props.rating}
        </Typography>
        <div className={classes.spacer} />
        <WatchlistButton id={props.id} />
      </CardActions>
    </Card>
  );
}

// Empty because we don't need props here, but need the function in 'connect'
const mapStateToProps = (state) => ({
  currentId: state.currentCard,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrentId: (id) => dispatch({ type: 'CURRENT_CARD', id }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MediaCard);
