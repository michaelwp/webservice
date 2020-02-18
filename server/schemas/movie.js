const {ApolloError} = require('apollo-server');
const axios = require('axios');
const redis = require('../redis');
const serverMovie = "http://10.128.0.3:3000";

const typeDefs = `
    extend type Query {
        movies: [Movie]
    }
    
    extend type Mutation {
        addMovie (
            title: String
            overview: String
            popularity: String
            poster_path: String
            tags: [String]
        ): Movie
    }
    
    extend type Mutation {
        updateMovie (
            _id: String
            title: String
            overview: String
            popularity: String
            poster_path: String
            tags: [String]
        ): Movie
    }
    
    extend type Mutation {
        deleteMovie (_id: String): Movie
    }
  
    type Movie {
        _id: String
        title: String
        overview: String
        popularity: String
        poster_path: String
        tags: [String]
    }
`;

const resolvers = {
    Query: {
        movies: async () => {
            let movies = await redis.get('movies');
            movies = JSON.parse(movies);

            if (movies !== null) {
                console.log("fetch data movies from redis");
                return movies.data
            }

            const {data} = await axios.get(`${serverMovie}/api/v1/movies/`);

            await redis.set('movies', JSON.stringify({data: data}));
            await redis.expire('movies', 60);
            return data
        },
    },
    Mutation: {
        addMovie: async (parent, args) => {
            const { data } = await axios.post(
                `${serverMovie}/api/v1/movies/`,
                {
                    title: args.title,
                    overview: args.overview,
                    popularity: args.popularity,
                    tags: args.tags,
                    poster_path: args.poster_path
                }
            );

            await redis.del('movies');
            return data
        },
        updateMovie: async (parent, args) => {
            const { data } = await axios.put(
                `${serverMovie}/api/v1/movies/${args._id}`,
                {
                    title: args.title,
                    overview: args.overview,
                    popularity: args.popularity,
                    tags: args.tags,
                    poster_path: args.poster_path
                }
            );

            await redis.del('movies');
            return data
        },
        deleteMovie: async (parent, args) => {
            const { data } = await axios.delete(
                `${serverMovie}/api/v1/movies/${args._id}`,
            );

            await redis.del('movies');
            return data
        }
    },
};

module.exports = {
    typeDefs, resolvers
};