const { makeExecutableSchema } = require('graphql-tools');
const Movie = require('../models/movies');
const User = require('../models/user');

// GraphQL type definitions
const typeDefs = `
    type Movie {
        _id: ID
        title: String!
        year: String
        runtime: String
        released: String
        directors: [String]
        poster: String
        plot: String
        fullplot: String
        type:Movie!
        imdb: ImdbType
        countries: [String]
        genres: [String]
    }

    type ImdbType {
      rating: String
      id: Int
      votes: Int
    }

    type ChartItem {
      x: Float
      y: Int
    }

    type User {
      _id: ID
      name: String
      watchlist: [Movie]
    }
    
    
    type Query {
      allMovies(sort: String, pagination: Int):[Movie]
      movie(_id:ID!): Movie
      findMoviesBasedOnYearRange(min: Int, max: Int, pagination: Int, skip: Int, sort: String): [Movie]
      findMoviesBasedOnGenre(genre: String, yearRange:[Int], ratingRange: [Int], pagination: Int, skip: Int, sort: String): [Movie]
      filterMovies(searchValue: String, genre: String, yearRange:[Int], ratingRange: [Int], pagination: Int, skip: Int, sort: String): [Movie]
      findImdbRatingPerYear(year:Int): [ChartItem]
      getUser(name:String): User
    }

    type Mutation {
      addUser(name: String): User
      addToWatchlist(name: String, movieID: ID): User
      removeFromWatchlist(name: String, movieID: ID): User
    }
`;

// Resolvers for the GraphQL schema
const resolvers = {
  // GraphQL queries
  Query: {
    movie: async (root, { _id }) => Movie.findById(_id),

    findMoviesBasedOnYearRange: async (
      root,
      {
        min, max, pagination, skip, sort,
      },
    ) => Movie.find({ year: { $lte: max, $gte: min } })
      .skip(skip)
      .limit(pagination)
      .sort(sort),

    findMoviesBasedOnGenre: async (root, {
      genre, yearRange, ratingRange, pagination, skip, sort,
    }) => Movie.find({
      genres: { $regex: genre, $options: 'i' },
      year: { $lte: yearRange[1], $gte: yearRange[0] },
      'imdb.rating': { $lte: ratingRange[1], $gte: ratingRange[0] },
    })
      .skip(skip)
      .limit(pagination)
      .sort(sort),

    // Main query for the search. Filters on search value, year range, rating range and genre
    filterMovies: async (
      root,
      {
        searchValue, yearRange, ratingRange, genre, pagination, skip, sort,
      },
    ) => Movie.find({
      $or: [
        { title: { $regex: searchValue, $options: 'i' } },
        { directors: { $regex: searchValue, $options: 'i' } },
      ],
      genres: { $regex: genre, $options: 'i' },
      year: { $lte: yearRange[1], $gte: yearRange[0] },
      'imdb.rating': { $lte: parseFloat(ratingRange[1]), $gte: parseFloat(ratingRange[0]) },
    })
      .skip(skip)
      .limit(pagination)
      .sort(sort),

    findImdbRatingPerYear: async (root, { year }) => Movie.find({ year }).then(
      (data) => data
        .reduce((obj, item) => {
          if (
            obj.find((o, i) => {
              if (parseFloat(o.x) === parseFloat(item.imdb.rating)) {
                obj[i] = {
                  x: parseFloat(o.x),
                  y: obj[i].y + 1,
                };
                return true; // stop searching
              }
            })
          ) {
          } else {
            obj.push({
              x: parseFloat(item.imdb.rating),
              y: 1,
            });
          }
          return obj;
        }, [])
        .sort((movie1, movie2) => (movie1.x > movie2.x ? 1 : -1)),
    ),

    getUser: async (root, { name }) => User.findOne({ name }),
  },
  // GraphQL mutations
  Mutation: {
    addUser: async (root, { name }) => {
      const user = await User.create({
        name,
        watchlist: [],
      });
      await user.save();
      return user;
    },

    addToWatchlist: async (root, { name, movieID }) => {
      const user = await User.findOne({ name });
      await User.updateOne(
        { name },
        { $addToSet: { watchlist: await Movie.findById(movieID) } },
        { new: true },
      );
      user.save();
      return user;
    },

    removeFromWatchlist: async (root, { name, movieID }) => {
      const user = await User.findOne({ name });
      await User.updateOne(
        { name },
        { $pull: { watchlist: await Movie.findById(movieID) } },
        { new: true },
      );
      user.save();
      return user;
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
