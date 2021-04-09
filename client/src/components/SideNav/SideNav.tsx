import React, { useEffect, useState, MouseEvent } from "react";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar } from "@material-ui/core";
import ConvoTab from "./ConvoTab/ConvoTab";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "../../features/userSlice";
import Modal from "../Modal/Modal";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_CHATS, ADD_CHAT, ADD_CHAT_SUB } from "../../graphql/chat";
import classes from "./SideNav.module.scss";

interface Convo {
  id: number;
}

// This SideNav component is also used in the main ChatScreen Page and simply holds all the conversations
// it also contains a bit of user information at the bottom (inspired by discord)
const SideNav = () => {
  const user = useSelector(setUser);
  const [convoName, setConvoName] = useState<string>("");
  const [convoDesc, setConvoDesc] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [addChatData] = useMutation(ADD_CHAT, {
    onCompleted: (data) => console.log(data),
    onError: (err) => console.error(err.message),
  });

  const { data: chatTabs, subscribeToMore, refetch } = useQuery(FETCH_CHATS);

  useEffect(() => {
    const subMessage = subscribeToMore({
      document: ADD_CHAT_SUB,
      updateQuery: (prev) => {
        refetch();
        return prev;
      },
    });
    return () => subMessage();
  }, []);

  // This only proceeds after Modal component has been loaded and information is entered
  // This handler will submit the new Conversatin room to the database and will add it to everyone using this chat app
  // Closes the Modal upon successful processing
  const handleAddChannel = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    addChatData({ variables: { name: convoName, description: convoDesc } });
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
          {chatTabs &&
            chatTabs.getChatTabs.map((ch: any) => (
              <ConvoTab
                key={ch.chat_id}
                id={ch.chat_id}
                convoName={ch.name}
                convoDesc={ch.description}
              />
            ))}
        </div>

        <div className={classes.Profile}>
          <Avatar className={classes.User}>{user.name.substring(0, 2)}</Avatar>
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <ExitToAppIcon onClick={() => dispatch(logout())} />
        </div>
      </div>
      <Modal
        open={openModal}
        nameHandler={(e) => setConvoName(e.currentTarget.value)}
        descHandler={(e) => setConvoDesc(e.currentTarget.value)}
        submitHandler={handleAddChannel}
        closeModal={(e) => setOpenModal(false)}
      />
    </>
  );
};

export default SideNav;
