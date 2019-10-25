import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import SearchResults from '../../components/SearchResults/SearchResults';
import SortFilter from '../../components/SortFilter/SortFilter';
import Filters from '../../components/FilterBar/Filters';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(10),
    margin: 'auto',
    maxWidth: 1000,
    color: theme.palette.text.primary,
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.secondary.main,
  },
  gridItem: {
    textAlign: 'center',
    margin: 'auto',
  },
}));

function SearchPage(props) {
  const classes = useStyles();
  const [visitedPages, setVisitedPages] = useState(props.pages);
  const [genreValue, setGenreValue] = useState(props.genre);
  const [yearRange, setYearRange] = useState(props.yearRange);
  const [ratingRange, setRatingRange] = useState(props.ratingRange);
  const [sortValue, setSortValue] = useState(props.sortValue || '-imdb');
  const { query, genre } = useParams();

  // Triggers only after the initial render
  useEffect(() => {
    // Resets the search attributes to allow for url searching
    props.resetSearch();
    setVisitedPages([0]);
    // eslint-disable-next-line
  }, []);

  // Increase lastPage to render a new set of results
  const handleOnDocumentBottom = () => {
    if (props.lastPage) {
      return;
    }
    const newLastPage = visitedPages[visitedPages.length - 1] + 1;
    setVisitedPages([...visitedPages, newLastPage]);
    props.addPage(newLastPage);
  };

  // Triggers when the body of the page hits the bottom
  useBottomScrollListener(handleOnDocumentBottom, 200);

  const onUpdate = (value) => {
    setSortValue(value);
  };
  const updateFilterBar = (genre, yearRangeValue, ratingRangeValue) => {
    if (yearRangeValue) {
      props.addYearFilter(yearRangeValue);
      setYearRange(yearRangeValue);
    }
    if (ratingRangeValue) {
      props.addRatingFilter(ratingRangeValue);
      setRatingRange(ratingRangeValue);
    }
    if (genre || genre === '') {
      props.addGenreFilter(genre);
      setGenreValue(genre);
    }
    setVisitedPages([0]);
    props.resetPages();
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item xs={12} sm={4} className={classes.gridItem}>
          <div>
            Showing results for <b>{query || genre || 'latest releases'}</b>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.gridItem}>
          <SortFilter onUpdate={onUpdate} />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.gridItem}>
          <Filters
            updateFilterBar={updateFilterBar}
            genre={genre || genreValue}
            initialYearRange={yearRange}
            initialRatingRange={ratingRange}
          />
        </Grid>
      </Grid>
      <div className={classes.cardList}>
        {visitedPages.map((page) => (
          <SearchResults
            key={page}
            page={page}
            genreValue={genreValue}
            yearRange={yearRange}
            ratingRange={ratingRange}
            sortValue={sortValue}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  pages: state.pages,
  search: state.search,
  lastPage: state.lastPage,
  genre: state.genre,
  yearRange: state.yearRange,
  ratingRange: state.ratingRange,
  sortValue: state.sortValue,
});

const mapDispatchToProps = (dispatch) => ({
  addPage: (page) => dispatch({ type: 'NEW_PAGE', page }),
  addYearFilter: (years) => dispatch({ type: 'ADD_YEAR_FILTER', years }),
  addRatingFilter: (ratings) => dispatch({ type: 'ADD_RATING_FILTER', ratings }),
  addGenreFilter: (chosenGenre) => dispatch({ type: 'ADD_GENRE_FILTER', chosenGenre }),
  resetSearch: () => dispatch({ type: 'RESET_SEARCH' }),
  resetPages: () => dispatch({ type: 'RESET_PAGES' }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
