import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/styles';
import { IconButton, CardActions, Tooltip } from '@material-ui/core/';
import ReplayIcon from '@material-ui/icons/Replay';
import MovieList from './MovieList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(10),
    color: theme.palette.primary.contrastText,
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.secondary.main,
  },
  title: {
    margin: 0,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

function Watchlist(props) {
  const classes = useStyles();
  const username = props.user;

  const WATCHLIST_QUERY = gql`
    {
      getUser(name: "${username}") {
        _id
        name
        watchlist {
          _id
          title
          plot
          poster
          imdb {
            rating
          }
        }
      }
    }
  `;
  const {
    data, loading, error, refetch,
  } = useQuery(WATCHLIST_QUERY, {
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;

  if (!data) {
    window.location.reload();
  }

  const handleRefreshSite = () => {
    refetch();
  };

  // The ternery in the return statement checks whether a user is logged in,
  // the watchlist is empty or if the watchlist should be shown
  return (
    <div className={classes.root}>
      <div className={classes.cardList}>
        <h1 className={classes.title}>Watchlist</h1>
        {!username ? (
          <p>Must be signed in to have a watchlist</p>
        ) : data.getUser && data.getUser.watchlist.length > 0 ? (
          <div>
            <CardActions className={classes.actions}>
              <Tooltip title="Refresh watchlist">
                <IconButton
                  aria-label="refresh watchlist"
                  onClick={handleRefreshSite}
                >
                  <ReplayIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </CardActions>
            <MovieList data={data.getUser.watchlist} />
          </div>
        ) : (
          <p>No movies in watchlist</p>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  addToWatchlist: (movie) => dispatch({ type: 'WATCHLIST_ADD', movie }),
  removeFromWatchlist: (movie) => dispatch({ type: 'WATCHLIST_REMOVE', movie }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Watchlist);
