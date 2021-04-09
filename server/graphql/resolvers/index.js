const userResolver = require("./user");
const chatResolver = require("./chat");

module.exports = {
  Query: {
    ...chatResolver.Query,
  },

  Mutation: {
    ...userResolver.Mutation,
    ...chatResolver.Mutation,
  },

  Subscription: {
    ...chatResolver.Subscription,
  },
};
