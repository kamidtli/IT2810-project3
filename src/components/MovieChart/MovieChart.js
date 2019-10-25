import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from 'react-vis';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function MovieChart({ imdbRating, year }) {
  const CHART_QUERY = gql`
  {
    findImdbRatingPerYear (year: ${year}) {
      x
      y
    }
  }
  `;

  const { data, loading, error } = useQuery(CHART_QUERY);
  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;

  const setColor = (coordinates) => coordinates.map((item) => (item.x === imdbRating
    ? { x: item.x, y: item.y, color: 'red' }
    : { x: item.x, y: item.y, color: 'green' }));

  return (
    <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <VerticalBarSeries
        curve={null}
        data={setColor(data.findImdbRatingPerYear)}
        opacity={0.8}
        strokeStyle="solid"
        style={{}}
        colorType="literal"
      />
      <XAxis title="IMDb Rating" />
      <YAxis title="Number of movies" />
    </XYPlot>
  );
}

export default MovieChart;
