import React from 'react';
import { connect } from 'react-redux';
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
import Star from '@material-ui/icons/Stars';
import { Link } from 'react-router-dom';

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
  content: {
    textOverflow: 'ellipsis',
    marginBottom: '35px',
  },
  actions: {
    alignItems: 'center',
  },
  spacer: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  rating: {
    margin: 0,
  },
  ratingIcon: {
    padding: theme.spacing(1),
  },
}));

function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Link
        to={`/movie/${props.id}`}
        className={classes.link}
        onClick={() => (props.addCurrentId(props.id))}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.imgUrl || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1340&q=80'}
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
      <div className={classes.spacer} />
      <CardActions className={classes.actions}>
        <Star className={classes.ratingIcon} />
        <Typography gutterBottom className={classes.rating}>
          {props.rating}
        </Typography>
        <div className={classes.spacer} />
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

// Empty because we don't need props here, but need the function in 'connect'
const mapStateToProps = (state) => ({
  currentId: state.currentCard,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrentId: (id) => dispatch({ type: 'CURRENT_CARD', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaCard);
