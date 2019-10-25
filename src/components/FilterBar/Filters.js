import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer, Button, Grid, Slider,
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  fullList: {
    width: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1000,
    margin: 'auto',
    padding: theme.spacing(2),
  },
  genreButton: {
    width: '100%',
  },
  slider: {
    width: '70%',
  },
  gridContainer: {
    width: '100%',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(1),
  },
}));

export default function TemporaryDrawer({
  updateFilterBar, genre, initialYearRange, initialRatingRange,
}) {
  const classes = useStyles();
  const [yearRange, setYearRange] = useState(initialYearRange);
  const [ratingRange, setRatingRange] = useState(initialRatingRange);
  const [genreValue, setGenreValue] = useState(genre);
  const genres = ['Action', 'Animation', 'Comedy', 'Documentary', 'Drama', 'Fantasy', 'Romance', 'Thriller'];
  const [state, setState] = React.useState({
    top: false,
  });

  // Runs the callback function to update redux store
  const updateFilters = (genre, yearRangeValue, ratingRangeValue) => {
    updateFilterBar(genre, yearRangeValue, ratingRangeValue);
  };

  // Updates year in state and redux store
  const handleChangeYear = (event, newValue) => {
    updateFilters(genreValue, newValue, ratingRange);
    setYearRange(newValue);
  };

  // Updates rating in state and redux store
  const handleChangeRating = (event, newValue) => {
    updateFilters(genreValue, yearRange, newValue);
    setRatingRange(newValue);
  };

  // Updates genre in state and redux store
  const handleChangeGenre = (newGenre) => {
    updateFilters(newGenre, yearRange, ratingRange);
    setGenreValue(newGenre);
  };

  const toggleDrawer = (side, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const fullList = () => (
    <div
      className={classes.fullList}
      role="presentation"
    >
      <div className={classes.container}>
        <h2 className={classes.title}>Year</h2>
        <div className={classes.slider}>
          <Slider
            value={yearRange}
            min={1893}
            max={2019}
            valueLabelDisplay="on"
            onChange={handleChangeYear}
            aria-labelledby="range-slider"
          />
        </div>
        <h2 className={classes.title}>Rating</h2>
        <div className={classes.slider}>
          <Slider
            value={ratingRange}
            min={0}
            max={10}
            valueLabelDisplay="on"
            onChange={handleChangeRating}
            aria-labelledby="range-slider"
          />
        </div>
        <h2 className={classes.title}>Genre</h2>
        <Grid
          container
          spacing={2}
          className={classes.gridContainer}
        >
          <Grid item xs={12} md={4}>
            <Button
              variant={genreValue === '' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleChangeGenre('')}
              className={classes.genreButton}
            >
              All
            </Button>
          </Grid>
          {genres.map((genre) => (
            <Grid item xs={6} md={4} key={genre}>
              <Button
                variant={genreValue === genre ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleChangeGenre(genre)}
                className={classes.genreButton}
              >
                {genre}
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={toggleDrawer('top', true)}>Filters</Button>
      <Drawer anchor="top" open={state.top} onClose={toggleDrawer('top', false)}>
        {fullList()}
      </Drawer>
    </div>
  );
}
