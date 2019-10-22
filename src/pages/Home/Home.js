import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { shadows } from '@material-ui/system';
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
    textAlign: 'center',
    margin: 'auto',
    padding: theme.spacing(2),
    marginTop: theme.spacing(10),
    maxWidth: 1000,
    color: theme.palette.text.primary,
  },
  searchBox: {
    display: 'grid',
    padding: theme.spacing(1),
    width: '80vw',
    paddingLeft: '20px',
    marginRigth: '40px',
    gridTemplateColumns: 'repeat(2,1fr)',
  },
  contentBox: {
    padding: theme.spacing(1),
    width: '80vw',
    paddingLeft: '20px',
    marginRigth: '40px',
  },
  container: {
    marginTop: theme.spacing(6),
    justifyContent: 'center',
  },
  titleHeader: {
    position: 'relative',
  },
  customButton: {
    position: 'absolute',
    right: '10px',
    top: '0px',
  },

}));

function Home(theme) {
  const classes = useStyles();
  const genres = ['Action', 'Comedy', 'Documentary', 'Drama', 'Fanatasy', 'Romance', 'Short', 'Thriller'];

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>

        <div className={classes.searchContent}>
          <Box boxShadow={2} className={classes.searchBox}>
            <div>
              <h1>Search for movies</h1>
              <SearchField />
            </div>
            <div>
              <h3>Or find a movie based on genre</h3>
              {genres.map((genre) => (
                <Link key={genre} to={`/search?q=${genre}`}>
                  <Button
                    variant="outlined"
                    color="secondary"
                  >
                    {genre}
                  </Button>
                </Link>
              ))}
            </div>
          </Box>
        </div>
        <div className={classes.container}>
          <Box boxShadow={2} className={classes.contentBox}>
            <div className={classes.titleHeader}>
              <h1>Latest release</h1>
              <Link to="/search?q=">
                <Button className={classes.customButton} variant="contained" color="primary">View more</Button>
              </Link>
            </div>
            <PreviewCardList />
          </Box>
        </div>

      </ThemeProvider>


    </div>
  );
}

export default Home;
