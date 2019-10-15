import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import SearchResults from './pages/SearchResults/SearchResults';
import DetailedCard from './pages/DetailedCard/DetailedCard';
import SignIn from './pages/SignIn/SignIn';
import theme from './theme';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '100vh',
    color: theme.palette.primary.contrastText,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <div className={['App', classes.root]}>
            <Navbar title="Movie searcher" />
          </div>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/auth">
              <SignIn />
            </Route>
            <Route path="/movie/:id">
              <DetailedCard />
            </Route>
            <Route path="/search">
              <SearchResults />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
