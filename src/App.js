import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_MOVIES = gql` 
  {
    movie (id: "573a1390f29313caabcd4135") {
      id
      title
    }
  }
`

export default function App() {
  const { data, loading, error } = useQuery(GET_MOVIES);
  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {data.movie.id}
      {data.movie.title}
    </div>
  );
}