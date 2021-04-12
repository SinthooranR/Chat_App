// const { ApolloServer, PubSub } = require("apollo-server");
const { ApolloServer, PubSub } = require("apollo-server-express");
const { createServer } = require("http");
const express = require("express");
const app = express();
const path = require("path");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const pubsub = new PubSub();
const PORT = process.env.port || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({ req, pubsub }),
  subscriptions: {
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
  },
});

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

server.applyMiddleware({ app });
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log("Listening on Port 5000");
  console.log(`GraphQL: http://localhost:${PORT}${server.graphqlPath}`);
  console.log(
    `Subscription: ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
