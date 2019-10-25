import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: 120,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: 120,
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

function NavbarSearch(props) {
  const classes = useStyles();
  const history = useHistory();

  // redirects to search page with the correct search query
  // and resets the search and filters in the redux store
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.target.blur();
      props.resetSearch();
      props.addSearch(event.target.value);
      history.push(`/search/${event.target.value}`);
      event.preventDefault();
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addSearch: (searchString) => dispatch({ type: 'NEW_SEARCH', searchString }),
  resetSearch: () => dispatch({ type: 'RESET_SEARCH' }),
});

export default connect(null, mapDispatchToProps)(NavbarSearch);
