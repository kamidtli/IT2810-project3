const graphql = require('graphql');
const _ = require('lodash');
const Movie = require('../models/movies');
const Director = require('../models/director');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data
const movies = [
  {
    id: '1', name: 'Interstellar', genre: 'Drama', directorId: '1',
  },
  { id: '2', name: 'Black Panther', genre: 'Action' },
  {
    id: '3', name: 'The Hateful Eight', genre: 'Drama', directorId: '2',
  },
  {
    id: '4', name: 'Dunkirk', genre: 'Drama', directorId: '1',
  },
  {
    id: '5', name: 'The Dark Knight Rises', genre: 'Action', directorId: '1',
  },
  {
    id: '6', name: 'Inglorious Bastards', genre: 'Action', directorId: '2',
  },
  {
    id: '7', name: 'Once Upon a Time in Hollywood', genre: 'Drama', directorId: '2',
  },

];

const directors = [
  { id: '1', name: 'Christopher Nolan', age: 49 },
  { id: '2', name: 'Quentin Tarantino', age: 56 },
];

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    directorId: { type: GraphQLID },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(movies, { id: args.id });
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(directors, { id: args.id });
        return Director.findById(args.id);
      },
    },
    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return Movie.find({});
      },
    },
    directors: {
      type: GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
        return Director.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const director = Director({
          name: args.name,
          age: args.age,
        });
        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });
        return movie.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
