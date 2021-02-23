import React, { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { setConvoInfo } from "../../../features/convoSlice";
import classes from "./ConvoTab.module.scss";

interface ConvoTabProps {
  id?: string;
  convoName?: string;
}

// These tabs are used for displaying conversations added into the public chat
// this will allow us to update the redux state with its new conversation ID and name
const ConvoTab = ({ id, convoName }: ConvoTabProps) => {
  const dispatch = useDispatch();

  const selectCurrentConvo = (event: MouseEvent<HTMLDivElement>) => {
    dispatch(
      setConvoInfo({
        convoId: id,
        convoName: convoName,
      })
    );
  };

  return (
    <div className={classes.ConvoTab} onClick={selectCurrentConvo}>
      <h4>{convoName}</h4>
    </div>
  );
};

export default ConvoTab;
