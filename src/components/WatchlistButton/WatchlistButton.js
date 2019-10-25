import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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

function MediaCard(props) {
  const classes = useStyles();
  const [isInWatchlist, setIsInWatchlist] = useState();
  const username = props.user;
  const watchlist = props.watchlist;
  const history = useHistory();

  // Query to get a user has the movie in the watchlist or not
  const WATCHLIST_QUERY = gql`
    query isInWatchlist($name: String, $movieID: ID) {
      isInWatchlist(name: $name, movieID: $movieID)
    }
  `;

  const { data } = useQuery(
    WATCHLIST_QUERY,
    {
      variables: { name: username, movieID: props.id }
    },
    { fetchPolicy: 'network-only' }
  );

  // Mutation to add movie to the watchlist
  const ADD_WATCHLIST_MUTATION = gql`
    mutation addToWatchlist($name: String, $movieID: ID) {
      addToWatchlist(name: $name, movieID: $movieID) {
        _id
        name
      }
    }
  `;

  const [
    addToWatchlist,
    {
      // Variables need to be set to a different name, since default names have been used already
      data: addData
    }
  ] = useMutation(ADD_WATCHLIST_MUTATION);

  // Mutation to remove movie from the watchlist
  const REMOVE_WATCHLIST_MUTATION = gql`
    mutation removeFromWatchlist($name: String, $movieID: ID) {
      removeFromWatchlist(name: $name, movieID: $movieID) {
        _id
        name
      }
    }
  `;

  const [removeFromWatchlist, { called }] = useMutation(
    REMOVE_WATCHLIST_MUTATION
  );

  if (watchlist && watchlist.includes(props.id) && !isInWatchlist) {
    setIsInWatchlist(true);
  }

  const onWatchlistAddClick = () => {
    if (username) {
      addToWatchlist({
        variables: { name: username, movieID: props.id }
      });
      props.addToStore(props.id);
      setIsInWatchlist(true);
    } else {
      history.push('/auth');
    }
  };

  const onWatchlistRemoveClick = () => {
    removeFromWatchlist({
      variables: { name: username, movieID: props.id }
    });
    props.removeFromStore(props.id);
    setIsInWatchlist(false);
  };

  if (isInWatchlist) {
    return (
      <CardActions className={classes.actions}>
        <Tooltip title='Remove from watchlist'>
          <IconButton
            aria-label='add to watchlist'
            onClick={onWatchlistRemoveClick}
          >
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    );
  } 
    return (
      <CardActions className={classes.actions}>
        <Tooltip title='Add to watchlist'>
          <IconButton
            aria-label='add to watchlist'
            onClick={onWatchlistAddClick}
          >
            <WatchLaterIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    );
  
}

// Empty because we don't need props here, but need the function in 'connect'
const mapStateToProps = (state) => ({
  currentId: state.currentCard,
  user: state.user,
  watchlist: state.watchlist,
});

const mapDispatchToProps = (dispatch) => ({
  addToStore: (movieID) => dispatch({ type: 'ADD_TO_WATCHLIST', movieID }),
  removeFromStore: (movieID) => dispatch({ type: 'REMOVE_FROM_WATCHLIST', movieID }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MediaCard);
