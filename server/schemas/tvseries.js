const {ApolloError} = require('apollo-server');
const axios = require('axios');
const redis = require('../redis');
const serverTvSeries = "http://10.128.0.3:3001";

const typeDefs = `
    extend type Query {
        tvSeries: [TvSeries]
    }
    
    extend type Mutation {
        addTvSeries (
            title: String
            overview: String
            popularity: String
            poster_path: String
            tags: [String]
        ): TvSeries
    }
    
    extend type Mutation {
        updateTvSeries (
            _id: String
            title: String
            overview: String
            popularity: String
            poster_path: String
            tags: [String]
        ): TvSeries
    }
    
    extend type Mutation {
        deleteTvSeries (_id: String): TvSeries
    }
  
    type TvSeries {
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
        tvSeries: async () => {
            let tvSeries = await redis.get('tvseries');
            tvSeries = JSON.parse(tvSeries);

            if (tvSeries !== null) {
                console.log("fetch data Tv Series from redis");
                return tvSeries.data
            }

            const {data} = await axios.get(`${serverTvSeries}/api/v1/tvseries/`);

            await redis.set('tvseries', JSON.stringify({data: data}));
            await redis.expire('tvseries', 60);
            return data
        },
    },
    Mutation: {
        addTvSeries: async (parent, args) => {
            const { data } = await axios.post(
                `${serverTvSeries}/api/v1/tvseries/`,
                {
                    title: args.title,
                    overview: args.overview,
                    popularity: args.popularity,
                    tags: args.tags,
                    poster_path: args.poster_path
                }
            );

            await redis.del('tvseries');
            return data
        },
        updateTvSeries: async (parent, args) => {
            const { data } = await axios.put(
                `${serverTvSeries}/api/v1/tvseries/${args._id}`,
                {
                    title: args.title,
                    overview: args.overview,
                    popularity: args.popularity,
                    tags: args.tags,
                    poster_path: args.poster_path
                }
            );

            await redis.del('tvseries');
            return data
        },
        deleteTvSeries: async (parent, args) => {
            const { data } = await axios.delete(
                `${serverTvSeries}/api/v1/tvseries/${args._id}`,
            );

            await redis.del('tvseries');
            return data
        }
    }
};

module.exports = {
    typeDefs, resolvers
};