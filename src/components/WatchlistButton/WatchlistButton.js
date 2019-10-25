import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { CardActions, IconButton, Tooltip } from '@material-ui/core/';
import WatchlistIcon from '@material-ui/icons/PlaylistAdd';
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
  const { watchlist, user } = props;
  const history = useHistory();

  // Mutation to add movie to the watchlist
  const ADD_WATCHLIST_MUTATION = gql`
    mutation addToWatchlist($name: String, $movieID: ID) {
      addToWatchlist(name: $name, movieID: $movieID) {
        _id
        name
      }
    }
  `;

  const [addToWatchlist] = useMutation(ADD_WATCHLIST_MUTATION);

  // Mutation to remove movie from the watchlist
  const REMOVE_WATCHLIST_MUTATION = gql`
    mutation removeFromWatchlist($name: String, $movieID: ID) {
      removeFromWatchlist(name: $name, movieID: $movieID) {
        _id
        name
      }
    }
  `;

  const [removeFromWatchlist] = useMutation(
    REMOVE_WATCHLIST_MUTATION,
  );

  if (watchlist && watchlist.includes(props.id) && !isInWatchlist) {
    setIsInWatchlist(true);
  }

  const onWatchlistAddClick = () => {
    if (user) {
      addToWatchlist({
        variables: { name: user, movieID: props.id },
      });
      props.addToStore(props.id);
      setIsInWatchlist(true);
    } else {
      history.push('/auth');
    }
  };

  const onWatchlistRemoveClick = () => {
    removeFromWatchlist({
      variables: { name: user, movieID: props.id },
    });
    props.removeFromStore(props.id);
    setIsInWatchlist(false);
  };

  if (isInWatchlist && user) {
    return (
      <CardActions className={classes.actions}>
        <Tooltip title="Remove from watchlist">
          <IconButton
            aria-label="add to watchlist"
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
      <Tooltip title="Add to watchlist">
        <IconButton
          aria-label="add to watchlist"
          onClick={onWatchlistAddClick}
        >
          <WatchlistIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
}

const mapStateToProps = (state) => ({
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
