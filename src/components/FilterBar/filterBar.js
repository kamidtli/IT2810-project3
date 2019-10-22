import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import { shadows } from '@material-ui/system';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const useStyles = makeStyles((theme) => ({
  filterBar: {
    margin: theme.spacing(1),
    justifySelf: 'right'
  },
  hiddenList: {
    display: 'none',
    flexDirection: 'column',
    color: 'black',
    justifyContent: 'center',
  },
  listActive: {
    display: 'flex',
    width: '400px',
    backgroundColor: 'white',
    flexDirection: 'column',
    position: 'absolute',
    marginTop: theme.spacing(1),
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '20px',
    zIndex: 100,
  },

  listStyling: {
    listStyle: 'none',
  },
  title: {
    color: 'black',
  },
  sliderPadding: {
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '20px'
  }

}));

export default function SortBar({ filterValue, updateFilterBar, genre, initialYearRange, initialRatingRange }) {
  const classes = useStyles();
  const [filterActive, setFilterList] = useState(false);
  const [yearRange, setYearRange] = useState(initialYearRange);
  const [ratingRange, setRatingRange] = useState(initialRatingRange);
  const [genreValue, setGenreValue] = useState(genre);
  const genres = ['Action', 'Comedy', 'Documentary', 'Drama', 'Fanatasy', 'Romance', 'Short', 'Thriller' ]

  const handleChange = (event, newValue) => {
    setYearRange(newValue);
  };

  const handleChangeRating = (event, newValue) => {
    setRatingRange(newValue);
  };

  const changeGenreValue = (genreValueChange) => {
    setGenreValue(genreValueChange);
  };

  const changeFilterValues = (genre, yearRangeValue, ratingRangeValue) => {
    updateFilterBar(genre, yearRangeValue, ratingRangeValue);
  };

  const changeFilterButton = () => {
    setFilterList(!filterActive);
    changeFilterValues(genreValue, yearRange, ratingRange);
  };

  return (
    <div className={classes.filterBar}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={changeFilterButton}
      >
          Filter
          <ArrowDropDownIcon />
      </Button>
      <Box boxShadow={3} className={filterActive ? classes.listActive : classes.hiddenList}>
        <h2 className={classes.title}>Year</h2>
        <div className={classes.sliderPadding}>
          <Slider
            value={yearRange}
            min={1980}
            max={2019}
            valueLabelDisplay="on"
            onChange={handleChange}
            aria-labelledby="range-slider"
          />
        </div>
        <h2 className={classes.title}>Rating</h2>
        <div className={classes.sliderPadding}>
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
        <Grid item>
        <Button 
              variant={genreValue === '' ? "contained" : 'outlined'}
              color= {genreValue === '' ? "primary": "secondary"}
              onClick={() => changeGenreValue('')}>
            All
          </Button>
          {genres.map((genre) => 
            <Button 
              variant={genreValue === genre ? "contained" : 'outlined'}
              color= {genreValue === genre ? "primary": "secondary"}
              onClick={() => changeGenreValue(genre)}>
            {genre}
            </Button>
          )}
        </Grid>
      </Box>
    </div>
  );
}
