const { makeExecutableSchema } = require('graphql-tools');
const graphql = require('graphql');
const Movie = require('../models/movies');

const { GraphQLSchema } = graphql;

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
    },
    
    input TableMovieFilterInput {
       title: TableStringFilterInput
       directors: TableStringFilterInput
       searchField: TableStringFilterInput
    }
    
    input TableStringFilterInput {
      ne: String
      eq: String
      le: String
      lt: String
      ge: String
      gt: String
      contains: String
      notContains: String
      between:[String]
      beginsWith: String
    }
    
    type Query {
      movieList:[Movie]
      movie(_id:ID!): Movie
      searchMovie(title:String):[Movie]
      filterMovies(title:String, pagination: Int, skip: Int): [Movie]
      findMoviesBasedOnDirector(director:String): [Movie]
      findMoviesBasedOnYear(year:Int): [Movie]
    }
`;

const resolvers = {
  Query: {
    movieList: async (args) => await Movie.find(),
    movie: async (root, { _id }) => await Movie.findById(_id),
    searchMovie: async (root, { title }) => await Movie.find({ title }),
    filterMovies: async (root, {
      title,
      pagination,
      skip,
    }) => await Movie.find(
      { title: { $regex: title, $options: 'i' } },
    ).skip(skip).limit(pagination),
    findMoviesBasedOnDirector: async (root, {
      director,
    }) => await Movie.find(
      { directors: { $regex: director, $options: 'i' } },
    ),
    findMoviesBasedOnYear: async (root, {
      year,
    }) => await Movie.find(
      { year },
    ),
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });


module.exports = schema;
