const { ApolloServer, PubSub } = require("apollo-server");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
  subscriptions: {
    path: "/subscriptions",
  },
});

server
  .listen({ port: PORT })
  .then(() => console.log("Listening on Port 5000"))
  .catch((err) => console.error(err));
