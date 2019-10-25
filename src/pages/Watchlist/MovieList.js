import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '../../components/Card/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1000,
    color: theme.palette.secondary.main,
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    minWidth: '320px',
  },
  button: {
    margin: theme.spacing(1),
  },
  noResults: {
    height: '500px',
    paddingTop: theme.spacing(10),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
}));

function MovieList(props) {
  const classes = useStyles();
  const { data } = props;

  // Changed width if this component is to show only a single card
  let mdWidth = 6;
  let lgWidth = 4;
  if (data.length === 1) {
    mdWidth = 12;
    lgWidth = 12;
  }
  if (data.length > 0) {
    return (
      <div className={classes.root}>
        <Grid container>
          {data.map((movie) => (
            <Grid
              item
              xs={12}
              md={mdWidth}
              lg={lgWidth}
              key={movie._id}
              className={classes.gridItem}
            >
              <Card
                title={movie.title}
                shortDescription={movie.plot}
                imgUrl={movie.poster}
                rating={movie.imdb.rating}
                id={movie._id}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default MovieList;
