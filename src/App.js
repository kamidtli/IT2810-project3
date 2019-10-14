import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient } from 'apollo-boost'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { BrowserRouter, Route } from 'react-router-dom';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

// Apollo client setup
const client = new ApolloClient({
  cache,
  link
});
const searchValue = gql`
query($searchQuery: String) {
  filterMovies(filter: {
    searchField: {
      contains: $searchQuery
    }
  }) {
    title

  }
}
`;

const AllMovies = gql`
{
  movieList {
    title
  }
}
`

class App extends React.Component {
  state = {
    searchQuery: ''
  };
  render(){
    const searchquery = this.props
    return (
          <div className="App">
            <p>{searchquery.onSearch}</p>
          </div>
    );
  }
}

const graphqlQuery = graphql(AllMovies, {
  options: data => ({
    fetchPolicy: 'cache-and-network'
  }),
  props: props => ({
    onSearch: searchQuery => {
      return props.data.fetchMore({
        query: searchQuery === '' ? AllMovies : searchValue, // 10
        variables: {
          searchQuery
        },
      })
    },
    data: props.data
  })
});

export default graphqlQuery(App);
