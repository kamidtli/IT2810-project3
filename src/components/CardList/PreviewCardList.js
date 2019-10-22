import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '../Card/Card';
import search from '../../reducers/search';
import SortBar from '../SortBar/sortBar';
import FilterBar from '../FilterBar/filterBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1000,
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },

}));

export default function PreviewCardList() {
  const classes = useStyles();

  const SEARCH_QUERY = gql`
  {
    findMoviesBasedOnYearRange(min:2015, max: 2019, sort:"-released", pagination:6,){
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


  const renderData = (toRender) => (
    toRender.map((movie) => (
      <Grid item xs={12} md={6} lg={4} key={movie._id} className={classes.gridItem}>
        <Card
          title={movie.title}
          shortDescription={movie.plot}
          imgUrl={movie.poster}
          id={movie._id}
        />
      </Grid>
    ))
  );


  return (
    <div>
      <div className={classes.root}>
        <Grid container>
          {renderData(data.findMoviesBasedOnYearRange)}
        </Grid>
      </div>
    </div>
  );
}
