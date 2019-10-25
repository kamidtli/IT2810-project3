import React from 'react';
import {
  Button, Menu, MenuItem, Avatar,
} from '@material-ui/core/';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function UserIcon(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Shows logout button when avatar is clicked
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Hides logout button when avatar is blurred
  const unFocus = () => {
    setAnchorEl(null);
  };

  // Hides logout button and logs out user
  const handleClose = () => {
    setAnchorEl(null);
    props.clearWatchlist();
    props.logOut();
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar className={classes.avatar}>{props.user[0]}</Avatar>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={unFocus}
      >
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  clearWatchlist: () => dispatch({ type: 'CLEAR_WATCHLIST' }),
  logOut: () => dispatch({ type: 'LOG_OUT' }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserIcon);
