const graphql = require('graphql');
const _ = require('lodash');
const Movie = require('../models/movies');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    year: { type: GraphQLString },
    plot: { type: GraphQLString },
    fullplot: { type: GraphQLString },
    type: { type: GraphQLString },
    poster: { type: GraphQLString },
    directors: {type: GraphQLList(GraphQLString) },
    genres: { type: GraphQLList(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(movies, { id: args.id });
        return Movie.findById(args._id);
      },
    },
    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return Movie.find({});
      },
    },
    searchMovies: {
      type: GraphQLList(MovieType),
      args: {name: {type: GraphQLString}},
      resolve(parents, args) {
        return Movie.find({where: args.name})
      }
    }
  },
});


module.exports = new GraphQLSchema({
  query: RootQuery,
});
