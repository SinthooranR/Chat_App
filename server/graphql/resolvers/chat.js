const pool = require("../../db");
const checkToken = require("../../utility/tokens/checkToken");
const { UserInputError } = require("apollo-server-errors");
const {
  validateChat,
  validateMessage,
} = require("../../utility/validators/chatValidate");

module.exports = {
  Query: {
    async getChatTabs() {
      try {
        const chatTabs = await pool.query("SELECT * FROM chat");
        if (chatTabs.rows[0]) {
          return chatTabs.rows;
        } else {
          throw new Error("No Chats found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async getChatMessages(_, { chat_id }, context) {
      try {
        const chatMessages = await pool.query(
          "SELECT * FROM messages WHERE chat_id = $1",
          [chat_id]
        );
        if (chatMessages.rows[0]) {
          return chatMessages.rows;
        } else {
          throw new Error("No Messages found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createChat(_, { name, description }, context) {
      const user = checkToken(context);
      const { errors, isValid } = validateChat(name, description);
      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      const chat = await pool.query(
        "INSERT INTO chat(name, description) VALUES($1, $2) RETURNING *",
        [name, description]
      );

      context.pubsub.publish("NEW_CHAT", {
        newChat: chat.rows[0],
      });

      return {
        ...chat.rows[0],
      };
    },

    async sendMessage(_, { chat_id, messagebody }, context) {
      const { user_id, name } = checkToken(context);
      const { errors, isValid } = validateMessage(messagebody);

      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      const checkChatID = await pool.query(
        "SELECT chat_id, name from chat where chat_id = $1",
        [chat_id]
      );

      if (!checkChatID.rows[0].chat_id) {
        throw new UserInputError("This Chat does not Exist");
      }

      const messageSent = await pool.query(
        "INSERT INTO messages(chat_id, user_id, name, messagebody, datesent) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [
          checkChatID.rows[0].chat_id,
          user_id,
          name,
          messagebody,
          new Date().toISOString(),
        ]
      );
      context.pubsub.publish("NEW_MESSAGE", {
        newMessage: messageSent.rows[0],
      });

      return {
        ...messageSent.rows[0],
      };
    },
  },

  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_MESSAGE"),
    },
    newChat: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_CHAT"),
    },
  },
};
