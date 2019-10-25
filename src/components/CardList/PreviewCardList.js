import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Card from '../Card/Card';

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


// Card list for homepage which shows the 6 latest movies
export default function PreviewCardList() {
  const classes = useStyles();

  const SEARCH_QUERY = gql`
  {
    findMoviesBasedOnYearRange(min:2015, max: 2019, sort:"-released", pagination:9,){
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


  const {
    data, loading, error,
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
          rating={movie.imdb.rating}
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
