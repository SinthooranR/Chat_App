import React, { FormEvent, useEffect, useState } from "react";
import Header from "./Header/Header";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { setConvoId, setConvoName } from "../../features/convoSlice";
import { setUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import db from "../../firebase";
import firebase from "firebase";
import classes from "./Chat.module.scss";
import Message from "./Message/Message";
const Chat = () => {
  const user = useSelector(setUser);
  const convoId = useSelector(setConvoId);
  const convoName = useSelector(setConvoName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any>([]);

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

  return (
    <div className={classes.Chat}>
      <Header convoName={convoName} />
      <div className={classes.Messages}>
        {messages.length > 0 &&
          messages.map((msg: any) => (
            <Message
              key={msg.timestamp}
              message={msg.message}
              timestamp={msg.timestamp}
              user={msg.user}
            />
          ))}
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
            placeholder={`Message ${convoName}`}
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
