import React from 'react';
import { shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import gql from 'graphql-tag';
import CardList from '../components/CardList/CardList';


const SEARCH_QUERY = gql`
    {
        filterMovies (
            searchValue: "pirates}",
            genre: "action",
            yearRange: [1980,2019],
            ratingRange: [5,10],
            sort: "rating", pagination: 12, skip: 0 ) {
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
        searchValue: 'pirates',
        genre: '',
        yearRange: [1980, 2019],
        ratingRange: [5, 10],
        sort: 'rating',
        pagination: 12,
        skip: 0,
      },
    },
    result: {
      data: {
        filterMovies: [
          {
            _id: '573a13aaf29313caabd2128b',
            title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
            plot: "Blacksmith Will Turner teams up with eccentric pirate \"Captain\" Jack Sparrow to save his love, the governor's daughter, from Jack's former pirate allies, who are now undead.",
            poster: 'https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX677_AL_.jpg',
            imdb: {
              rating: 8.1,
            },
          },
          {
            _id: '573a13aef29313caabd2ec0c',
            title: "Pirates of the Caribbean: Dead Man's Chest",
            plot: "Jack Sparrow races to recover the heart of Davy Jones to avoid enslaving his soul to Jones' service, as other friends and foes seek the heart for their own agenda as well.",
            poster: 'https://m.media-amazon.com/images/M/MV5BMTcwODc1MTMxM15BMl5BanBnXkFtZTYwMDg1NzY3._V1_SY1000_SX677_AL_.jpg',
            imdb: {
              rating: 7.3,
            },
          },
          {
            _id: '573a13b3f29313caabd3de52',
            title: "Pirates of the Caribbean: At World's End",
            plot: 'Captain Barbossa, Will Turner and Elizabeth Swann must sail off the edge of the map, navigate treachery and betrayal, and make their final alliances for one last decisive battle.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMjIyNjkxNzEyMl5BMl5BanBnXkFtZTYwMjc3MDE3._V1_SY1000_SX677_AL_.jpg',
            imdb: {
              rating: 7.1,
            },
          },
          {
            _id: '573a13c3f29313caabd69a70',
            title: 'Pirates of the Caribbean: On Stranger Tides',
            plot: 'Jack Sparrow and Barbossa embark on a quest to find the elusive fountain of youth, only to discover that Blackbeard and his daughter are after it too.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMjE5MjkwODI3Nl5BMl5BanBnXkFtZTcwNjcwMDk4NA@@._V1_SY1000_SX677_AL_.jpg',
            imdb: {
              rating: 6.7,
            },
          },
        ],
      },
    },
  },
];
describe('Card List', () => {
  it('renders without crashing', () => {
    const cardList = shallow(<MockedProvider mocks={mocks}><CardList /></MockedProvider>);
    expect(cardList.toJSON).toMatchSnapshot();
  });
});
