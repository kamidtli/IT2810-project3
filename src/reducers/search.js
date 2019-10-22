const search = (state = [], action) => {
  switch (action.type) {
    case 'NEW_SEARCH':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
        },
      ];
    default:
      return state;
  }
};

export default search;
