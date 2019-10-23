import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PreviewCardList from '../../components/CardList/PreviewCardList';
import SearchField from '../../components/SearchField/SearchField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    marginTop: theme.spacing(15),
    maxWidth: 1000,
    color: theme.palette.text.primary,
    paddingBottom: theme.spacing(10),
  },
  mainTitle: {
    margin: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  searchBox: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  searchAndGenreContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxwidth: 1000,
  },
  contentBox: {
    maxwidth: 1000,
    marginTop: theme.spacing(6),
  },
  viewAllButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  latestTitle: {
    margin: 0,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  gridContainer: {
    width: '100%',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  genreButton: {
    width: '80%',
    marginTop: theme.spacing(2),
    marginLeft: '10%',
    marginRight: '10%',
  },
}));

function Home(props, theme) {
  const classes = useStyles();
  const genres = ['Action', 'Comedy', 'Documentary', 'Drama', 'Fanatasy', 'Romance', 'Short', 'Thriller'];

  const handleGenreClick = () => {
    props.resetSearch();
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>

        <Box className={classes.searchAndGenreContainer}>
          <div className={classes.searchBox}>
            <h1 className={classes.mainTitle}>Search for thousands of movies</h1>
            <SearchField />
          </div>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.gridContainer}
          >
            {genres.map((genre) => (
              <Grid key={genre} item xs={6} md={3}>
                <Link className={classes.link} key={genre} to={`/search/genre/${genre}`} onClick={handleGenreClick}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.genreButton}
                  >
                    {genre}
                  </Button>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box className={classes.contentBox}>
          <h1 className={classes.latestTitle}>Latest releases</h1>
          <PreviewCardList />
          <div className={classes.viewAllButtonContainer}>
            <Link to="/search">
              <Button color="primary">View all</Button>
            </Link>
          </div>
        </Box>

      </ThemeProvider>


    </div>
  );
}

// Empty because we don't need props here, but need the function in 'connect'
const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  addSearch: (searchString) => dispatch({ type: 'NEW_SEARCH', searchString }),
  resetSearch: () => dispatch({ type: 'RESET_SEARCH' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
