import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { setUser } from "../../../features/userSlice";
import { Avatar } from "@material-ui/core";
import classes from "./Message.module.scss";

interface MessageProps {
  timestamp?: any;
  message?: string;
  user: string;
  user_id: string;
}

// This components creats the Messages of the chat component
// it stores the conversation name fetched from firebase using the conversation Id store in redux
// it contains the user data from redux, the messages from firebase, and the time it was sent to the firebase server
const Message = ({ user, user_id, message, timestamp }: MessageProps) => {
  const userInfo = useSelector(setUser);

  let avatarColor;
  if (user_id === userInfo.user_id) {
    avatarColor = classes.User;
  } else {
    avatarColor = classes.NotUser;
  }

  return (
    <div className={classes.Message}>
      <Avatar className={avatarColor}>{user.substring(0, 2)}</Avatar>
      <div className={classes.Info}>
        <h4>
          {user}
          <span className={classes.Time}>
            {timestamp && moment(timestamp).fromNow()}
          </span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
