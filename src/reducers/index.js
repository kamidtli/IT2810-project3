const initialState = {
  pages: [0],
  lastPage: false,
  search: [],
  currentCard: '',
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
    default:
      break;
  }
  return newState;
};

export default reducer;
