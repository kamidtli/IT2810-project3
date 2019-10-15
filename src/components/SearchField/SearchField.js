import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: 'auto',
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function SearchField() {
  const classes = useStyles();
  const [toResults, setToResults] = useState(false);
  const [query, setQuery] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.target.blur();
      setQuery(event.target.value);
      setToResults(true);
      event.preventDefault();
    }
  };

  if (toResults) {
    return <Redirect push to={`/search?q=${query}`} />;
  }
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-with-placeholder"
        label="Search"
        className={classes.textField}
        margin="normal"
        onKeyDown={handleKeyDown}
        variant="outlined"
      />
    </form>
  );
}
