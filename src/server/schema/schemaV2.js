import gql  from 'graphql-tag'
import { makeExecutableSchema } from 'graphql-tools';
import Movie from "../models/movies"

const typeDefs = gql`
    type Movie {
        id: ID!
        title: String!
        year: Number!
        runtime: String!
        released: String!
        poster: String!
        plot: String!
        fullplot: String!
        type:Movie!
        imdb: String!
        votes: String!
        countries: [String!]!
        genres: [String!]!
    }

    type Query {
        movie: Movie
        movies: [Movie]
    }
    
`;

const resolvers = {
    Query: {
        movies: () => {
            return Movie.find()
        },
        movie: (title) => {
            return Movie.find({title: title})
        },
    }
}

export const schema = new makeExecutableSchema({
    typeDefs,
    resolvers
});
