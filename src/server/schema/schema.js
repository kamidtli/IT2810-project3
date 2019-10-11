const graphql = require('graphql');
const _ = require('lodash');
const Movie = require('../models/movies');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    year: { type: GraphQLInt },
    plot: { type: GraphQLString },
    imdb: { type: GraphQLString },
    type: { type: GraphQLString },
    poster: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findById(args.id);
      }
    },
    movies: {
      type: GraphQLList(MovieType),
      args: {
        year: { type: GraphQLInt },
        title: { type: GraphQLString }
      },
      resolve(parent, args) {
        // return movies;
        return Movie.find({
          year: args.year,
          title: args.title
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
