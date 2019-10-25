import React from 'react';
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

/**
 * Component for querying and rendering
 * child components with query data.
 * Uses 'page' from props for pagination
 * @param {*} props
 */

function SearchResults(props) {
  const classes = useStyles();
  const {
    page,
    genreValue,
    yearRange,
    ratingRange,
    sortValue,
  } = props;
  const { query } = useParams();

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
  }

  const {
    data, loading, error,
  } = useQuery(QUERY);

  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;

  const results = query ? data.filterMovies : data.findMoviesBasedOnYearRange;

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
