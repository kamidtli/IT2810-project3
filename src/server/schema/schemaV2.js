const { makeExecutableSchema } = require('graphql-tools');
const Movie = require('../models/movies');

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
      rating: Float
      id: Int
      votes: Int
    }

    type ChartItem {
      x: Float
      y: Int
    }
    
    type Query {
      allMovies(sort: String, pagination: Int):[Movie]
      movie(_id:ID!): Movie
      searchMovie(title:String):[Movie]
      findMoviesBasedOnTitle(title:String, pagination: Int, skip: Int, sort: String): [Movie]
      findMoviesBasedOnDirector(director:String, pagination: Int, skip: Int, sort: String): [Movie]
      findMoviesBasedOnYear(year: Int, pagination: Int, skip: Int, sort: String): [Movie]
      findMoviesBasedOnGenre(genre: String, pagination: Int, skip: Int, sort: String): [Movie]
      findMoviesBasedOnYearRange(min: Int, max: Int, pagination: Int, skip: Int, sort: String): [Movie]
      filterMovies(searchValue: String, genre: String, yearRange:[Int], ratingRange: [Int], pagination: Int, skip: Int, sort: String): [Movie]
      findImdbRatingPerYear(year:Int): [ChartItem]
    }
`;

const resolvers = {
  Query: {
    allMovies: async () => await Movie.find(),
    movie: async (root, { _id }) => await Movie.findById(_id),
    findMoviesBasedOnTitle: async (root, {
      title, pagination, skip, sort,
    }) => await Movie.find({ title: { $regex: title, $options: 'i' } })
      .skip(skip)
      .limit(pagination)
      .sort(sort),
    findMoviesBasedOnDirector: async (
      root,
      {
        director, pagination, skip, sort,
      },
    ) => await Movie.find({ directors: { $regex: director, $options: 'i' } })
      .skip(skip)
      .limit(pagination)
      .sort(sort),
    findMoviesBasedOnYear: async (root, {
      year, pagination, skip, sort,
    }) => await Movie.find({ year })
      .skip(skip)
      .limit(pagination)
      .sort(sort),
    findMoviesBasedOnYearRange: async (
      root,
      {
        min, max, pagination, skip, sort,
      },
    ) => await Movie.find({ year: { $lte: max, $gte: min } })
      .skip(skip)
      .limit(pagination)
      .sort(sort),
    findMoviesBasedOnGenre: async (root, {
      genre, pagination, skip, sort,
    }) => await Movie.find({ genres: { $regex: genre, $options: 'i' } })
      .skip(skip)
      .limit(pagination)
      .sort(sort),
    filterMovies: async (
      root,
      {
        searchValue, yearRange, ratingRange, genre, pagination, skip, sort,
      },
    ) => await Movie.find({
      $or: [
        { title: { $regex: searchValue, $options: 'i' } },
        { directors: { $regex: searchValue, $options: 'i' } },
      ],
      genres: { $regex: genre, $options: 'i' },
      year: { $lte: yearRange[1], $gte: yearRange[0] },
      'imdb.rating': { $lte: ratingRange[1], $gte: ratingRange[0] },
    })
      .skip(skip)
      .limit(pagination)
      .sort(sort),
    findImdbRatingPerYear: async (root, { year }) => await Movie.find({ year }).then(
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
      (error) => console.log(error),
    ),
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
