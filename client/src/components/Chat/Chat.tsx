import React, { FormEvent, useEffect, useState, MouseEvent } from "react";
import Header from "./Header/Header";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  setConvoId,
  setConvoName,
  setConvoDesc,
} from "../../features/convoSlice";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUBSCRIPTION,
  GET_CHAT_MESSAGES,
} from "../../graphql/chat";
import Message from "./Message/Message";
import classes from "./Chat.module.scss";

// This component is used for the Chat Page once a user is successfully logged in
const Chat = () => {
  // some state variables for inputs and grabbing chats
  const convoId = useSelector(setConvoId);
  const convoName = useSelector(setConvoName);
  const convoDesc = useSelector(setConvoDesc);
  const [input, setInput] = useState("");

  // Apollo Client helper functions
  const [sendMsgData] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.error(err.message),
  });

  const { data: chatMessages, subscribeToMore, refetch } = useQuery(
    GET_CHAT_MESSAGES,
    {
      variables: { chat_id: convoId },
      skip: !convoId,
    }
  );

  // A Handler to submit messages to the server containing information of the user, the message, and the server timestamp
  // Once a message is successfully sent, it will wipe the input value so you can type another message without having to erase what you written in the input
  const sendMsgHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (convoId) {
      sendMsgData({ variables: { chat_id: convoId, messagebody: input } });
    }
    setInput("");
  };

  useEffect(() => {
    const subMessage = subscribeToMore({
      document: SEND_MESSAGE_SUBSCRIPTION,
      updateQuery: (prev) => {
        refetch();
        return prev;
      },
    });
    return () => subMessage();
  }, []);

  // Header: The component originally created for the UI appearance which carries the conversation name store in redux, and changes whe you select new conversations
  // Messages: with the data grabbed from firebase, we can map that data and render the Message Component created before when you set the conversation ID, which is done using redux dispatching
  // Input: Can simply type and press your enter button to send the message as the form type definitions were set to be used with the input
  return (
    <div className={classes.Chat}>
      <Header convoName={convoName} convoDesc={convoDesc} />
      <div className={classes.Messages}>
        {chatMessages ? (
          chatMessages.getChatMessages.map((msg: any) => (
            <Message
              key={msg.message_id}
              message={msg.messagebody}
              timestamp={msg.datesent}
              user={msg.name}
              user_id={msg.user_id}
            />
          ))
        ) : (
          <p className={classes.NoMsgText}>
            Be the first to start the Conversation
          </p>
        )}
      </div>

      <div className={classes.Input}>
        <AddCircleIcon fontSize="large" />
        <form onSubmit={sendMsgHandler}>
          <input
            value={input}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setInput(e.currentTarget.value)
            }
            disabled={!convoId}
            type="text"
            placeholder={`${
              convoName ? `Message ${convoName}` : `Select a Convo`
            }`}
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
