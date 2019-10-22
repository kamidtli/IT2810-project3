import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import { shadows } from '@material-ui/system';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const useStyles = makeStyles((theme) => ({
  sortBar: {
    margin: theme.spacing(1),
    justifySelf: 'left'
  },
  hiddenList: {
    display: 'none',
    flexDirection: 'column',
    color: 'black',
    justifyContent: 'center',
  },
  listActive: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    zIndex: 100,
    width: '200px',
    position: 'absolute',
    backgroundColor: 'white',
  },

  listStyling: {
    listStyle: 'none',
  },
  noBorderRadius: {
    borderRadius: 0,
    border: '0px'
  }

}));

export default function SortBar({sortValue, onUpdate}) {
  const classes = useStyles();
  const [sortActive, setSortList] = useState(false);
  const [sortListValue, setSortValue] = useState(sortValue);

  const changeSortButton = () => {
    setSortList(!sortActive);
  };

  const changeSortValue = (sortValueChange) => {
    setSortValue(sortValueChange);
    onUpdate(sortValueChange);
  };

  return (
    <div className={classes.sortBar}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={changeSortButton}
      >
          Sort
          <ArrowDropDownIcon />
      </Button>
      <Box boxShadow={3} className={sortActive ? classes.listActive : classes.hiddenList}>
            <Button 
            className={classes.noBorderRadius}
            variant={sortListValue === 'title' ? "contained" : "outlined"} 
            color={sortListValue ==='title' ? "primary": "secondary"}
            onClick={() => changeSortValue('title')}>
              Alphabetic
            </Button>
            <Button 
            className={classes.noBorderRadius}
            variant={sortListValue === 'imdb' ? "contained" : "outlined"} 
            color={sortListValue ==='imdb' ? "primary": "secondary"}
            onClick={() => changeSortValue('imdb')}>
              Rating
            </Button>
            <Button 
            className={classes.noBorderRadius}
            variant={sortListValue === '-released' ? "contained" : "outlined"} 
            color={sortListValue ==='-released' ? "primary": "secondary"}
            onClick={() => changeSortValue('-released')}>
              Release date
            </Button>
      </Box>
    </div>
  );
}
