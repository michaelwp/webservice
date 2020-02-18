const { ApolloServer, makeExecutableSchema } = require('apollo-server');

const movie = require('./schemas/movie');
const tvSeries = require('./schemas/tvseries');

const typeDefs = `
  type Query,
  type Mutation
`;

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, movie.typeDefs, tvSeries.typeDefs],
    resolvers: [movie.resolvers, tvSeries.resolvers]
});

const server = new ApolloServer({ schema });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});