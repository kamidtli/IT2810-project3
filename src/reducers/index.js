const initialState = {
  pages: [0],
  lastPage: false,
  search: [],
  currentCard: '',
  user: null,
  watchlist: null,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'NEW_PAGE':
      newState.pages.push(action.page);
      break;
    case 'LAST_PAGE':
      newState.lastPage = action.val;
      break;
    case 'NEW_SEARCH':
      newState.search.push(action.searchString);
      break;
    case 'RESET_SEARCH':
      newState.pages = [0];
      newState.lastPage = false;
      break;
    case 'CURRENT_CARD':
      newState.currentCard = action.id;
      break;
    case 'LOGIN_USER':
      newState.user = action.username;
      break;
    case 'LOG_OUT':
      newState.user = null;
      break;
    case 'CREATE_WATCHLIST':
      newState.watchlist = action.movies;
      break;
    case 'ADD_TO_WATCHLIST':
      newState.watchlist.push(action.movieID);
      break;
    case 'REMOVE_FROM_WATCHLIST':
      newState.watchlist = newState.watchlist.filter(
        (movie) => movie !== action.movieID,
      );
      break;
    case 'CLEAR_WATCHLIST':
      newState.watchlist = null;
      break;
    default:
      break;
  }
  return newState;
};

export default reducer;
