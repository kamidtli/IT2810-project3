import React from 'react';
import { AppBar, Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import SideMenu from '../SideMenu/sideMenu';
import UserIcon from '../UserIcon/UserIcon';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px',
  },
  spacer: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const { user } = props;

  return (
    <AppBar className={classes.root}>
      <SideMenu />
      <div className={classes.spacer} />
      <NavbarSearch />
      { !user
        ? (
          <Link to="/auth">
            <Button variant="contained" color="secondary" className={classes.button}>
          SIGN IN
            </Button>
          </Link>
        )
        : <UserIcon />}
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
)(Navbar);
