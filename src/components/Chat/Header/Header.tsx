import React from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import classes from "./Header.module.scss";

interface HeaderProps {
  convoName?: string | null;
}

const Header = ({ convoName }: HeaderProps) => {
  return (
    <div className={classes.Header}>
      <div className={classes.Left}>
        <h2>{convoName!}</h2>
      </div>
      <div className={classes.Right}>
        <NotificationsIcon />
        <PeopleAltRoundedIcon />
      </div>
    </div>
  );
};

export default Header;
