const clickCard = (state = [], action) => {
  switch (action.type) {
    case 'CURRENT_ID':
      return [
        ...state,
        {
          id: action.id,
        },
      ];
    default:
      return state;
  }
};

export default clickCard;
