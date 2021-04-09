import React from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import classes from "./Header.module.scss";

interface HeaderProps {
  convoName?: string | null;
  convoDesc?: string | null;
}

// This components creats the Top Header of the chat component
// it stores the conversation name grabbed by the redux state
const Header = ({ convoName, convoDesc }: HeaderProps) => {
  return (
    <div className={classes.Header}>
      <div className={classes.Left}>
        <h2>{convoName!}</h2>
        <p>{convoDesc!}</p>
      </div>
      <div className={classes.Right}>
        <NotificationsIcon />
        <PeopleAltRoundedIcon />
      </div>
    </div>
  );
};

export default Header;
