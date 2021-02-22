import React, { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { setConvoInfo } from "../../../features/convoSlice";
import classes from "./ConvoTab.module.scss";

interface ConvoTabProps {
  id?: string;
  convoName?: string;
}

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
      <h4>
        <span>#</span>
        {convoName}
      </h4>
    </div>
  );
};

export default ConvoTab;
