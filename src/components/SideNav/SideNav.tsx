import React, { useEffect, useState, MouseEvent } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Avatar } from "@material-ui/core";
import ConvoTab from "./ConvoTab/ConvoTab";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import db, { auth } from "../../firebase";
import classes from "./SideNav.module.scss";

const SideNav = () => {
  const user = useSelector(setUser);
  const [convos, setConvos] = useState<any>([]);

  useEffect(() => {
    // onSnapshot allows real time use and updates realTime for firebase
    db.collection("conversations").onSnapshot((snapshot) =>
      setConvos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = (event: MouseEvent<HTMLOrSVGElement>) => {
    const channelName = prompt("Enter Channel Name");

    if (channelName) {
      db.collection("conversations").add({
        channelName: channelName,
      });
    }
  };

  return (
    <div className={classes.SideNav}>
      <div className={classes.Top}>
        <h2>Welcome</h2>
      </div>
      <div className={classes.Header}>
        <h4>Public Chats</h4>
        <AddIcon onClick={handleAddChannel} fontSize="large" />
      </div>

      <div className={classes.Convos}>
        {convos.map((ch: any) => (
          <ConvoTab key={ch.id} id={ch.id} convoName={ch.channel.channelName} />
        ))}
      </div>

      <div className={classes.Profile}>
        <Avatar src={user.photo} onClick={() => auth.signOut()} />
        <div>
          <h3>{user.displayName}</h3>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
