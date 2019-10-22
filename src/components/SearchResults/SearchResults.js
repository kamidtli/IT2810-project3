import React, { useCallback, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';
import CardList from '../CardList/CardList';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  const { page } = props;
  const searchValue = props.search[props.search.length - 1];

  //   const handleOnDocumentBottom = useCallback(() => {
  //     fetchMore({
  //       variables: {
  //         skip: page * 10,
  //       },
  //       updateQuery: (prev, { fetchMoreResult }) => {
  //         if (!fetchMoreResult) return prev;
  //         // Append new results to the old ones
  //         const newResults = [...searchResults, ...fetchMoreResult.filterMovies];
  //         console.log('Prev', prev);
  //         console.log('Search results:', searchResults);
  //         console.log('newResults', newResults);
  //         addSearchResults(newResults);
  //         return {
  //           ...prev, ...fetchMoreResult,
  //         };
  //       },
  //     });
  //   }, []);

  const SEARCH_QUERY = gql`
  {
    filterMovies (title: "${searchValue}", pagination: 12, skip: ${page * 12}) {
      _id
      title
      plot
      poster
    }
  }
  `;

  const {
    data, loading, error, fetchMore,
  } = useQuery(SEARCH_QUERY);

  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className={classes.root}>

      <div className={classes.cardList}>
        <CardList data={data.filterMovies} />
        {/* {data.filterMovies.map((movie) => (
            movie.title
            ))} */}
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
