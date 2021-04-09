import React, { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConvoInfo, setConvoId } from "../../../features/convoSlice";
import classes from "./ConvoTab.module.scss";

interface ConvoTabProps {
  id?: number;
  convoName?: string;
  convoDesc?: string;
}

// These tabs are used for displaying conversations added into the public chat
// this will allow us to update the redux state with its new conversation ID and name
const ConvoTab = ({ id, convoName, convoDesc }: ConvoTabProps) => {
  const convoId = useSelector(setConvoId);

  const dispatch = useDispatch();

  let currentChat;
  if (id === convoId) {
    currentChat = classes.CurrentChat;
  }

  const selectCurrentConvo = (event: MouseEvent<HTMLDivElement>) => {
    dispatch(
      setConvoInfo({
        convoId: id,
        convoName: convoName,
        convoDesc: convoDesc,
      })
    );
  };

  return (
    <div
      className={[classes.ConvoTab, currentChat].join(" ")}
      onClick={selectCurrentConvo}
    >
      <h4>{convoName}</h4>
    </div>
  );
};

export default ConvoTab;
