import React, { useEffect, useState, MouseEvent } from "react";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar } from "@material-ui/core";
import ConvoTab from "./ConvoTab/ConvoTab";
import { useSelector } from "react-redux";
import { setUser } from "../../features/userSlice";
import db, { auth } from "../../firebase";
import classes from "./SideNav.module.scss";
import Modal from "../Modal/Modal";

interface Convo {
  id: string;
}

// This SideNav component is also used in the main ChatScreen Page and simply holds all the conversations
// it also contains a bit of user information at the bottom (inspired by discord)
const SideNav = () => {
  const user = useSelector(setUser);
  const [convos, setConvos] = useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [addConvoVal, setAddConvoVal] = useState<string>("");

  // This is will grab all the public chats rooms using the firebase server and is updated real-time
  useEffect(() => {
    // onSnapshot allows real time use and updates realTime for firebase
    db.collection("conversations").onSnapshot((snapshot) =>
      setConvos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          conversation: doc.data(),
        }))
      )
    );
  }, []);

  // This only proceeds after Modal component has been loaded and information is entered
  // This handler will submit the new Conversatin room to the database and will add it to everyone using this chat app
  // Closes the Modal upon successful processing
  const handleAddChannel = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (addConvoVal) {
      db.collection("conversations").add({
        convoName: addConvoVal,
      });
    }
    setOpenModal(false);
  };

  // AddIcon: Material-UI icon, and when pressed it opens the Modal component and allows us to enter information for new channel
  // convos are stored array data fetched from firebase using useEffect and renders out all the conversation tabs for everyone
  // Profile: this section is at the bottom, and contains some user information and a logout icon which logs you out of the firebase server
  return (
    <>
      <div className={classes.SideNav}>
        <div className={classes.Top}>
          <h2>Welcome</h2>
        </div>
        <div className={classes.Header}>
          <h4>Public Chats</h4>
          <AddIcon onClick={(e) => setOpenModal(true)} fontSize="large" />
        </div>

        <div className={classes.Convos}>
          {convos.length > 0 &&
            convos.map((ch: any) => (
              <ConvoTab
                key={ch.id}
                id={ch.id}
                convoName={ch.conversation.convoName}
              />
            ))}
        </div>

        <div className={classes.Profile}>
          <Avatar src={user.photo} />
          <div>
            <h3>{user.displayName}</h3>
            <p>{user.email}</p>
          </div>
          <ExitToAppIcon onClick={() => auth.signOut()} />
        </div>
      </div>
      <Modal
        open={openModal}
        inputHandler={(e) => setAddConvoVal(e.currentTarget.value)}
        submitHandler={handleAddChannel}
        closeModal={(e) => setOpenModal(false)}
      />
    </>
  );
};

export default SideNav;
