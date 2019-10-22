let nextSearchId = 0;
const newSearch = (text) => ({
  type: 'NEW_SEARCH',
  id: nextSearchId++,
  text,
});

export default newSearch;
