import React, { FormEvent, useEffect, useState } from "react";
import Header from "./Header/Header";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { setConvoId, setConvoName } from "../../features/convoSlice";
import { setUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import db from "../../firebase";
import firebase from "firebase";
import classes from "./Chat.module.scss";
const Chat = () => {
  const user = useSelector(setUser);
  const convoId = useSelector(setConvoId);
  const convoName = useSelector(setConvoName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    if (convoId) {
      db.collection("channels")
        .doc(convoId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [convoId]);

  const sendMsgHandler = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (convoId) {
      db.collection("channels").doc(convoId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user,
      });
    }
    setInput("");
  };

  return (
    <div className={classes.Chat}>
      <Header />
    </div>
  );
};

export default Chat;
