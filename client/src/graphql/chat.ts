import { gql } from "@apollo/client";

export const FETCH_CHATS = gql`
  query {
    getChatTabs {
      chat_id
      name
      description
    }
  }
`;

export const ADD_CHAT = gql`
  mutation createChat($name: String!, $description: String!) {
    createChat(name: $name, description: $description) {
      chat_id
      name
      description
    }
  }
`;

export const ADD_CHAT_SUB = gql`
  subscription newChat {
    newChat {
      chat_id
      name
      description
    }
  }
`;

export const GET_CHAT_MESSAGES = gql`
  query getChatMessages($chat_id: Int!) {
    getChatMessages(chat_id: $chat_id) {
      message_id
      chat_id
      user_id
      name
      messagebody
      datesent
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($chat_id: Int!, $messagebody: String!) {
    sendMessage(chat_id: $chat_id, messagebody: $messagebody) {
      message_id
      chat_id
      user_id
      name
      messagebody
      datesent
    }
  }
`;

export const SEND_MESSAGE_SUBSCRIPTION = gql`
  subscription newMessage {
    newMessage {
      message_id
      chat_id
      user_id
      name
      messagebody
      datesent
    }
  }
`;
