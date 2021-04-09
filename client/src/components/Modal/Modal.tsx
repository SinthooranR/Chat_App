import { Button } from "@material-ui/core";
import React, { MouseEvent, FormEvent } from "react";
import ReactModal from "react-modal";
import classes from "./Modal.module.scss";

interface ModalProps {
  nameValue?: string;
  descValue?: string;
  open: boolean;
  submitHandler?: (event: MouseEvent<HTMLFormElement>) => void;
  closeModal?: (event: MouseEvent<HTMLButtonElement>) => void;
  nameHandler?: (event: FormEvent<HTMLInputElement>) => void;
  descHandler?: (event: FormEvent<HTMLInputElement>) => void;
}

// A simple Modal used only when adding a New Channel into the database which was implemented using the react-modal package
const Modal = ({
  open,
  nameValue,
  descValue,
  submitHandler,
  closeModal,
  nameHandler,
  descHandler,
}: ModalProps) => {
  return (
    <ReactModal isOpen={open} ariaHideApp={false} className={classes.Modal}>
      <h1>Enter The Conversation Name</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.Input}>
          <input
            placeholder="Name of Chat"
            type="text"
            value={nameValue}
            onChange={nameHandler}
          />
          <input
            placeholder="Describe the Chat"
            type="text"
            value={descValue}
            onChange={descHandler}
          />
        </div>
        <div className={classes.Buttons}>
          <Button variant="contained" color="secondary" onClick={closeModal}>
            CANCEL
          </Button>
          <Button variant="contained" color="primary" type="submit">
            PROCEED
          </Button>
        </div>
      </form>
    </ReactModal>
  );
};

export default Modal;
