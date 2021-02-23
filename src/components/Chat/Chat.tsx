import React, { FormEvent, useEffect, useState } from "react";
import Header from "./Header/Header";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { setConvoId, setConvoName } from "../../features/convoSlice";
import { setUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import db from "../../firebase";
import firebase from "firebase";
import Message from "./Message/Message";
import classes from "./Chat.module.scss";

// This component is used for the Chat Page once a user is successfully logged in
const Chat = () => {
  const user = useSelector(setUser);
  const convoId = useSelector(setConvoId);
  const convoName = useSelector(setConvoName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any>([]);

  // This is will grab all the public chats using the firebase server and is updated real-time, using the conversation ID stored in redux as a dependency
  useEffect(() => {
    if (convoId) {
      db.collection("conversations")
        .doc(convoId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [convoId]);

  // A Handler to submit messages to the server containing information of the user, the message, and the server timestamp
  // Once a message is successfully sent, it will wipe the input value so you can type another message without having to erase what you written in the input
  const sendMsgHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (convoId) {
      db.collection("conversations").doc(convoId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user,
      });
    }
    setInput("");
  };

  // Header: The component originally created for the UI appearance which carries the conversation name store in redux, and changes whe you select new conversations
  // Messages: with the data grabbed from firebase, we can map that data and render the Message Component created before when you set the conversation ID, which is done using redux dispatching
  // Input: Can simply type and press your enter button to send the message as the form type definitions were set to be used with the input
  return (
    <div className={classes.Chat}>
      <Header convoName={convoName} />
      <div className={classes.Messages}>
        {messages.length > 0 ? (
          messages.map((msg: any) => (
            <Message
              key={msg.timestamp}
              message={msg.message}
              timestamp={msg.timestamp}
              user={msg.user}
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
