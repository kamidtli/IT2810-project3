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
        imdb: String
        countries: [String]
        genres: [String]
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
      filterMovies(filter:TableMovieFilterInput): [Movie]
    }
`;

const resolvers = {
  Query: {
    movieList: async (args) => {
      return await Movie.find()
    },
    movie: async (root, {_id}) => {
      return await Movie.findById(_id);
    },
    searchMovie: async (root,{title}) => {
      return await Movie.find({title: title})
    },
  }
};

const schema = makeExecutableSchema({typeDefs, resolvers});


module.exports = schema;