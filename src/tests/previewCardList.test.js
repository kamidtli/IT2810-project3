import React from 'react';
import { shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import gql from 'graphql-tag';
import PreviewCardList from '../components/CardList/PreviewCardList';

const SEARCH_QUERY = gql`
    {
        findMoviesBasedOnYearRange(min:2015, max: 2019, sort:"-released", pagination:6){
            _id
            title
            plot
            poster
            imdb {
                rating
            }
        }
    }
`;

const mocks = [
  {
    request: {
      query: SEARCH_QUERY,
      variables: {
        min: 2015,
        max: 2019,
        sort: '-released',
        pagination: 6,
      },
    },
    result: {
      data: {
        findMoviesBasedOnYearRange: [
          {
            _id: '573a13f8f29313caabde8d7a',
            title: 'The Treasure',
            plot: 'Costi leads a peaceful life. At night he likes to read his 6-year-old son stories, to help him sleep. Their favourite is Robin Hood. Costi sees himself as the hero - righter of wrongs and ...',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTUzNjIyOTU1Ml5BMl5BanBnXkFtZTgwMjEzNzI2NzE@._V1_SY1000_SX677_AL_.jpg',
            imdb: {
              rating: 7.5,
            },
          },
          {
            _id: '573a13d6f29313caabda10e6',
            title: 'Knight of Cups',
            plot: 'A screenwriter living in LA tries to make sense of the strange events occurring around him.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMjQyOTcwODIyNF5BMl5BanBnXkFtZTgwMDE4OTI4NzE@._V1_SY1000_SX677_AL_.jpg',
            imdb: {
              rating: 7.1,
            },
          },
          {
            _id: '573a13f4f29313caabde0bfd',
            title: 'Shut In',
            plot: "Anna suffers from agoraphobia so crippling that when a trio of criminals break into her house, she cannot bring herself to flee. But what the intruders don't realize is that agoraphobia is not her only psychosis.",
            poster: 'https://m.media-amazon.com/images/M/MV5BMTY5MzE0MjUwNV5BMl5BanBnXkFtZTgwNjQxNzM2NzE@._V1_SY1000_SX677_AL_.jpg',
            imdb: {
              rating: 7.1,
            },
          },
          {
            _id: '573a13f7f29313caabde74df',
            title: 'Dègradè',
            plot: "A hot summer's day in the Gaza Strip. Today the electricity is on. Christine's beauty salon is heaving with female clients: a bride-to-be, a pregnant woman, a bitter divorcèe, a devout ...",
            poster: null,
            imdb: {
              rating: 6.5,
            },
          },
          {
            _id: '573a13f9f29313caabdeb527',
            title: 'Land and Shade',
            plot: 'After having left a long time ago, a humble country sugar cane worker returns home to meet his grandson and deal with the hardships his family has been put into.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTUwZTM3M2ItZWM2Ny00ZDUwLWIzYzEtMWVmODc2NzYwODE1XkEyXkFqcGdeQXVyNjQ0NTQwNjk@._V1_SY1000_SX677_AL_.jpg',
            imdb: {
              rating: 7.6,
            },
          },
          {
            _id: '573a13f0f29313caabdd969c',
            title: 'Remember',
            plot: 'The darkest chapter of the 20th century collides with a contemporary mission of revenge.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMjM3OTY3Njc1OV5BMl5BanBnXkFtZTgwNDY0MzE1NzE@._V1_SY1000_SX677_AL_.jpg',
            imdb: {
              rating: 7.4,
            },
          },
        ],
      },
    },
  },
];
describe('Preview Card List', () => {
  it('renders without crashing', () => {
    const cardList = shallow(<MockedProvider mocks={mocks}><PreviewCardList /></MockedProvider>);
    expect(cardList.toJSON).toMatchSnapshot();
  });
});
