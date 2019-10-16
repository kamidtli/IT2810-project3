import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import SideMenu from '../SideMenu/sideMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px',
  },
  title: {
    color: theme.palette.primary.contrastText,
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <SideMenu />
      <div className={classes.title}>
        Movie Searcher
      </div>
      <Link to="/auth">
        <Button variant="contained" color="secondary" className={classes.button}>
          SIGN IN
        </Button>
      </Link>
    </AppBar>
  );
}
