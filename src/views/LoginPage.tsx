import React, { MouseEvent } from "react";
import { auth, googleProvider, fbProvider, githubProvider } from "../firebase";
import classes from "./LoginPage.module.scss";

const LoginPage = () => {
  const loginHandler = (event: MouseEvent<HTMLButtonElement>) => {
    //   do google login memes
    auth.signInWithPopup(googleProvider).catch((err) => alert(err.message));
  };

  const loginHandler2 = (event: MouseEvent<HTMLButtonElement>) => {
    //   do google login memes
    auth.signInWithPopup(fbProvider).catch((err) => alert(err.message));
  };

  const loginHandler3 = (event: MouseEvent<HTMLButtonElement>) => {
    //   do google login memes
    auth.signInWithPopup(githubProvider).catch((err) => alert(err.message));
  };

  return (
    <div className={classes.Login}>
      <button onClick={loginHandler}>Sign in With Google</button>
      <button onClick={loginHandler2}>Sign in With Facebook</button>
      <button onClick={loginHandler3}>Sign in With Github</button>
    </div>
  );
};

export default LoginPage;
