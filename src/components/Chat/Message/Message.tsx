import React from "react";
import { Avatar } from "@material-ui/core";
import classes from "./Message.module.scss";

interface MessageProps {
  timestamp?: any;
  message?: string;
  user: {
    photo?: string;
    displayName?: string;
  };
}

// This components creats the Messages of the chat component
// it stores the conversation name fetched from firebase using the conversation Id store in redux
// it contains the user data from redux, the messages from firebase, and the time it was sent to the firebase server
const Message = ({ user, message, timestamp }: MessageProps) => {
  return (
    <div className={classes.Message}>
      <Avatar src={user.photo} />
      <div className={classes.Info}>
        <h4>
          {user.displayName}
          <span className={classes.Time}>
            {timestamp && new Date(timestamp?.toDate()).toLocaleDateString()} at{" "}
            {timestamp &&
              new Date(timestamp?.toDate())
                .toLocaleTimeString()
                .replace(/(.*)\D\d+/, "$1")}
          </span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
