import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '../Card/Card';
import cardData from './listData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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

export default function CardList() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Grid container>
        {/* Change the key later so it's unique, and not only the image url */}
        {cardData.map((card) => (
          <Grid item xs={12} md={6} lg={4} key={card.key} className={classes.gridItem}>
            <Card
              title={card.title}
              shortDescription={card.desc}
              imgUrl={card.img}
              id={card.key}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
