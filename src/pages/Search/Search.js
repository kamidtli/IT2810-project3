import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { makeStyles } from '@material-ui/styles';
import SearchResults from '../../components/SearchResults/SearchResults';
import SortBar from '../../components/SortBar/sortBar';
import SortFilter from '../../components/SortBar/SortFilter';
import FilterBar from '../../components/FilterBar/filterBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
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
  filterAndSortBar: {
    display: 'flex',
    margin: theme.spacing(1),
  },
}));

function SearchPage(props) {
  const classes = useStyles();
  const [lastPage, setLastPage] = useState(0);
  const [visitedPages, setVisitedPages] = useState(props.pages);
  const [genreValue, setGenreValue] = useState('');
  const [yearRange, setYearRange] = useState([1980, 2019]);
  const [ratingRange, setRatingRange] = useState([5, 10]);
  const [sortValue, setSortValue] = useState('-released');

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
  useBottomScrollListener(
    handleOnDocumentBottom,
    200,
  );

  const onUpdate = (value) => {
    setSortValue(value);
  };
  const updateFilterBar = (genre, yearRangeValue, ratingRangeValue) => {
    setGenreValue(genre);
    setYearRange(yearRangeValue);
    setRatingRange(ratingRangeValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.filterAndSortBar}>
        <SortFilter
          onUpdate={onUpdate}
        />
        <FilterBar
          updateFilterBar={updateFilterBar}
          genre={genreValue}
          initialYearRange={yearRange}
          initialRatingRange={ratingRange}
        />
      </div>
      <div className={classes.cardList}>
        { visitedPages.map((page) => (
          <SearchResults
            key={page}
            page={page}
            genreValue={genreValue}
            yearRange={yearRange}
            ratingRange={ratingRange}
            sortValue={sortValue}
          />
        )) }
      </div>

    </div>
  );
}

const mapStateToProps = (state) => ({
  pages: state.pages,
  search: state.search,
  lastPage: state.lastPage,
});

const mapDispatchToProps = (dispatch) => ({
  addPage: (page) => dispatch({ type: 'NEW_PAGE', page }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
