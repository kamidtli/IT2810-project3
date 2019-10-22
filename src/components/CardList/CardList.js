import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
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
    color: theme.palette.secondary.main,
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
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

function CardList(props) {
  const classes = useStyles();
  const { data } = props;

  if (data.length > 0) {
    return (
      <div className={classes.root}>
        <Grid container>
          {data.map((movie) => (
            <Grid item xs={12} md={6} lg={4} key={movie._id} className={classes.gridItem}>
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

  props.onLastPage(true);
  return (
    <div className={classes.root}>
      <div className={classes.noResults}>
        No more results
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

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
