import { Button } from "@material-ui/core";
import React, { MouseEvent } from "react";
import { auth, googleProvider, fbProvider, githubProvider } from "../firebase";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import GitHubIcon from "@material-ui/icons/GitHub";
import classes from "./LoginPage.module.scss";

// Main Authentication Page
// If each login method contains same email, you must use the original login method you went with (eg. same facebook and github emails cant be used as seperate login methods)
const LoginPage = () => {
  // this function uses a switch and determins the authentication popup based off the type (string) passed in the function
  const loginHandler = (event: MouseEvent<HTMLButtonElement>, type: string) => {
    switch (type) {
      case "google":
        return auth
          .signInWithPopup(googleProvider)
          .catch((err) => alert(err.message));
      case "facebook":
        return auth
          .signInWithPopup(fbProvider)
          .catch((err) => alert(err.message));
      case "github":
        auth.signInWithPopup(githubProvider).catch((err) => alert(err.message));
    }
  };

  // This Mainly consists of Material-UI Buttons and Icons
  // Also shows the Note about duplicate email authentications for users to be aware
  return (
    <div className={classes.Login}>
      <h2>Welcome to the Chat App</h2>
      <div>
        <Button variant="contained" onClick={(e) => loginHandler(e, "google")}>
          <MailOutlineIcon /> Sign in With Google
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={(e) => loginHandler(e, "facebook")}
        >
          <FacebookIcon /> Sign in With Facebook
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => loginHandler(e, "github")}
        >
          <GitHubIcon /> Sign in With Github
        </Button>
      </div>
      <p>
        ***Note: If you end up using an account with an email already in the
        Database, you will have to use the Login Method you originally proceeded
        with***
      </p>
    </div>
  );
};

export default LoginPage;
