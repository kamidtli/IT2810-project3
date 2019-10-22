import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import SearchField from '../../components/SearchField/SearchField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 'auto',
    padding: theme.spacing(2),
    marginTop: theme.spacing(10),
    maxWidth: 1000,
    color: theme.palette.text.primary,
  },
}));

function Home(theme) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>

        <div className={classes.searchContent}>
          <SearchField />
        </div>

      </ThemeProvider>


    </div>
  );
}

export default Home;
