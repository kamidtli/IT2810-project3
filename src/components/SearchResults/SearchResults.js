import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';
import CardList from '../CardList/CardList';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.secondary.main,
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function SearchResults(props) {
  const classes = useStyles();
  const {
    page,
    genreValue,
    yearRange,
    ratingRange,
    sortValue,
  } = props;
  const { query, genre } = useParams();

  const SEARCH_QUERY = gql`
  {
    filterMovies (
      searchValue: "${query}",
      genre: "${genreValue}",
      yearRange: [${yearRange[0]},${yearRange[1]}],
      ratingRange: [${ratingRange[0]},${ratingRange[1]}],
      sort: "${sortValue}", pagination: 12, skip: ${page * 12} ) {
        _id
        title
        plot
        poster
        imdb {
          rating
        }
    }
  }
  `;

  const GENRE_QUERY = gql`
  {
    findMoviesBasedOnGenre ( genre: "${genre}", pagination: 12, skip: ${page * 12}) {
        _id
        title
        plot
        poster
        imdb {
          rating
        }
    }
  }
  `;

  const DEFAULT_QUERY = gql`
  {
    findMoviesBasedOnYearRange(min:2015, max: 2019, sort:"-released", pagination: 12, skip: ${page * 12}){
        _id
        title
        plot
        poster
        imdb {
          rating
        }
    }
  }
  `;

  let QUERY = DEFAULT_QUERY;
  if (query) {
    QUERY = SEARCH_QUERY;
  } else if (genre) {
    QUERY = GENRE_QUERY;
  }

  const {
    data, loading, error,
  } = useQuery(QUERY);

  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;

  const results = genre ? data.findMoviesBasedOnGenre : data.filterMovies;

  return (
    <div className={classes.root}>
      <div className={classes.cardList}>
        <CardList data={results} />
      </div>

    </div>
  );
}

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch) => ({
  onLastPage: (val) => dispatch({ type: 'LAST_PAGE', val }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
