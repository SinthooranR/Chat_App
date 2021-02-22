import React from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import classes from "./Header.module.scss";

interface HeaderProps {
  channelName?: string | null;
}

const Header = ({ channelName }: HeaderProps) => {
  return (
    <div className={classes.ChatHeader}>
      <div className={classes.ChatHeaderLeft}>
        <h3>
          <span className={classes.ChatHeaderHash}>#</span>
          {channelName!}
        </h3>
      </div>
      <div className={classes.ChatHeaderRight}>
        <NotificationsIcon />
        <PeopleAltRoundedIcon />
      </div>
    </div>
  );
};

export default Header;
