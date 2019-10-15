import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CardList from '../../components/CardList/CardList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(10),
    color: theme.palette.primary.contrastText,
  },
  cardList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function SearchResults() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <div className={classes.cardList}>
        <CardList />
      </div>

    </div>
  );
}

export default SearchResults;
