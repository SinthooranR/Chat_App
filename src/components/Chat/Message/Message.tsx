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

const Message = ({ user, message, timestamp }: MessageProps) => {
  return (
    <div className={classes.Message}>
      <Avatar src={user.photo} />
      <div className={classes.MessageInfo}>
        <h4>
          {user.displayName}
          <span className={classes.MessageTimeStamp}>
            {timestamp && new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
