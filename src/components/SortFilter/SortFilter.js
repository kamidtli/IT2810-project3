import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { MenuItem, FormControl, Select } from '@material-ui/core/';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 150,
  },
}));

function SimpleSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    sortValue: props.sortValue,
  });

  const handleChange = (event) => {
    let newValue = event.target.value;
    if (newValue === '') {
      newValue = '-imdb';
    }
    // Set values in state
    setValues((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    props.updateSortFilter(newValue); // Update sort value in redux store
    props.onUpdate(newValue); // Runs the callback function to update sort value
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <Select
          value={values.sortValue}
          onChange={handleChange}
          name="sortValue"
          displayEmpty
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

const mapStateToProps = (state) => ({
  sortValue: state.sortValue,
});

const mapDispatchToProps = (dispatch) => ({
  updateSortFilter: (sortValue) => dispatch({ type: 'NEW_SORT_VALUE', sortValue }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleSelect);
