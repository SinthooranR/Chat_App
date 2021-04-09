const gql = require("graphql-tag");

module.exports = gql`
  type User {
    user_id: ID!
    name: String!
    email: String!
    token: String!
  }

  type Chat {
    chat_id: Int!
    name: String!
    description: String!
  }

  type Message {
    message_id: Int!
    chat_id: Int!
    user_id: ID!
    name: String!
    messagebody: String!
    datesent: String!
  }

  type Query {
    getChatTabs: [Chat]
    getChatMessages(chat_id: Int!): [Message]
  }

  type Mutation {
    signup(
      name: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!

    # Password String is kept as not required due to error checking on resolvers
    login(email: String!, password: String): User!
    createChat(name: String!, description: String!): Chat!
    sendMessage(chat_id: Int!, messagebody: String!): Message!
  }

  type Subscription {
    newChat: Chat!
    newMessage: Message!
  }
`;
