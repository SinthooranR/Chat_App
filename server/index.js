const { ApolloServer, PubSub } = require("apollo-server");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
  subscriptions: {
    path: "/subscriptions",
  },
});

server.listen({ port: 5000 }).then(() => console.log("Listening on Port 5000"));
