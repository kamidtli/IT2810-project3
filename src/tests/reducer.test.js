import React from 'react';
import reducer from '../reducers';

describe('Reducer', () => {
  it('should login a user', () => {
    const state = { username: null };
    const newState = reducer(state, {
      type: 'LOGIN_USER',
      username: 'loginPerson'
    });
    expect(newState.user).toMatch('loginPerson');
  });

  it('should logout a user', () => {
    const state = { username: 'logoutPerson' };
    const newState = reducer(state, {
      type: 'LOG_OUT'
    });
    expect(newState.user).toBeNull();
  });

  it('should create an empty watchlist', () => {
    const state = { watchlist: null };
    const newState = reducer(state, {
      type: 'CREATE_WATCHLIST',
      movies: []
    });
    expect(newState.watchlist.length).toBe(0);
  });

  it('should create a watchlist with movieIDs', () => {
    const movies = ['movieID1', 'movieID2', 'movieID3'];
    const state = { watchlist: null };
    const newState = reducer(state, {
      type: 'CREATE_WATCHLIST',
      movies
    });
    expect(newState.watchlist).toEqual(movies);
  });

  it('should add a movie to watchlist', () => {
    const movies = ['movieID1', 'movieID2', 'movieID3'];
    const state = { watchlist: movies };
    const newState = reducer(state, {
      type: 'ADD_TO_WATCHLIST',
      movieID: 'movieID4'
    });
    expect(newState.watchlist).toContain('movieID4');
  });

  it('should remove a movie from watchlist', () => {
    const movies = ['movieID1', 'movieID2', 'movieID3'];
    const state = { watchlist: movies };
    const newState = reducer(state, {
      type: 'REMOVE_FROM_WATCHLIST',
      movieID: 'movieID2'
    });
    expect(newState.watchlist).not.toContain('movieID2');
  });

  it('should clear watchlist', () => {
    const movies = ['movieID1', 'movieID2', 'movieID3'];
    const state = { watchlist: movies };
    const newState = reducer(state, {
      type: 'CLEAR_WATCHLIST'
    });
    expect(newState.watchlist).toBeNull();
  });

  it('should add search to list or searches', () => {
    const state = { search: [] };
    const newState = reducer(state, {
      type: 'NEW_SEARCH',
      searchString: 'Christopher Nolan'
    });
    expect(newState.search[0]).toContain('Nolan');
  });

  it('should search multiple things', () => {
    const state = { search: ['Toy Story'] };
    reducer(state, {
      type: 'NEW_SEARCH',
      searchString: 'Terminator'
    });
    const newState = reducer(state, {
      type: 'NEW_SEARCH',
      searchString: 'Pirate'
    });
    expect(newState.search.length).toBe(3);
  });
});
