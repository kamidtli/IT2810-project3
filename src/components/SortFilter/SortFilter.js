import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    sortValue: '',
  });

  const handleChange = (event) => {
    let newValue = event.target.value;
    if (newValue === '') {
      newValue = '-imdb';
    }
    setValues((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    props.onUpdate(newValue);
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <Select
          value={values.sortValue}
          onChange={handleChange}
          name="sortValue"
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">Rating (Highest first)</MenuItem>
          <MenuItem value="imdb">Rating (Lowest first)</MenuItem>
          <MenuItem value="-released">Released (Newest first)</MenuItem>
          <MenuItem value="released">Released (Oldest first)</MenuItem>
          <MenuItem value="title">Alphabetic</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}
