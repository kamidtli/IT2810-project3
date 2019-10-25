import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '../../components/Card/Card';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1000,
    color: theme.palette.secondary.main
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  noResults: {
    height: '500px',
    paddingTop: theme.spacing(10),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
}));

function MovieList(props) {
  const classes = useStyles();
  const { data } = props;
  
  if (data.length > 0) {
    return (
      <div className={classes.root}>
        <Grid container>
          {data.map(movie => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={movie._id}
              className={classes.gridItem}
            >
              <Card
                title={movie.title}
                shortDescription={movie.plot}
                imgUrl={movie.poster}
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
