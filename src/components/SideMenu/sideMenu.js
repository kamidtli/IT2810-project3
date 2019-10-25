import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Drawer, Button, List, ListItem, ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
}));

export default function SideMenu() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer('left', false)}
      onKeyDown={toggleDrawer('left', false)}
    >
      <List>
        <Link to="/" className={classes.link}>
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/watchlist" className={classes.link}>
          <ListItem button>
            <ListItemText primary="Watchlist" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)} className={classes.icon}>
        <MenuIcon fontSize="large" />
      </Button>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
      >
        {sideList()}
      </Drawer>
    </div>
  );
}
