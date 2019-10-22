import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { makeStyles } from '@material-ui/styles';
import SearchResults from '../../components/SearchResults/SearchResults';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(10),
    color: theme.palette.primary.contrastText,
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.secondary.main,
  },
}));

function SearchPage(props) {
  const classes = useStyles();
  const [lastPage, setLastPage] = useState(0);
  const [visitedPages, setVisitedPages] = useState(props.pages);

  // Increase lastPage to render a new set of results
  const handleOnDocumentBottom = () => {
    if (props.lastPage) {
      return;
    }
    const newLastPage = visitedPages[visitedPages.length - 1] + 1;
    setVisitedPages([...visitedPages, newLastPage]);
    props.addPage(newLastPage);
  };

  // Triggers when the body of the page hits the bottom
  useBottomScrollListener(
    handleOnDocumentBottom,
    200,
  );

  return (
    <div className={classes.root}>

      <div className={classes.cardList}>
        { visitedPages.map((page) => (
          <SearchResults key={page} page={page} />
        )) }
      </div>

    </div>
  );
}

const mapStateToProps = (state) => ({
  pages: state.pages,
  search: state.search,
  lastPage: state.lastPage,
});

const mapDispatchToProps = (dispatch) => ({
  addPage: (page) => dispatch({ type: 'NEW_PAGE', page }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
