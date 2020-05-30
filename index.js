const { ApolloServer, PubSub } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const { MONGODB } = require('./config');

const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // This will give each request object, and we can check token and authentication stuff from this object
    // and this request will be returned to each resolver's context
    context: ( { req } ) => ({ req, pubsub })
});

mongoose.connect(MONGODB , { useNewUrlParser: true,  useUnifiedTopology: true }).then(res => {
    console.log("MongoDB Connected");
    return server.listen({ port : PORT });
}).then(res => {
    console.log(`Server Started at ${res.url}`);
}).catch(err => console.error(err))