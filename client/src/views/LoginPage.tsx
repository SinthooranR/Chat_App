import { Button } from "@material-ui/core";
import React, { FormEvent, MouseEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { LOGIN, SIGNUP } from "../graphql/user";
import classes from "./LoginPage.module.scss";

// Main Authentication Page
// If each login method contains same email, you must use the original login method you went with (eg. same facebook and github emails cant be used as seperate login methods)
const LoginPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const dispatch = useDispatch();

  const [loginData] = useMutation(LOGIN, {
    onCompleted: (data) => dispatch(login(data.login)),
    onError: (err: any) => {
      if (err.graphQLErrors[0].extensions.exception.errors) {
        setValidationErrors(err.graphQLErrors[0].extensions.exception.errors);
      }
    },
  });

  const [signupData] = useMutation(SIGNUP, {
    onCompleted: (data) => dispatch(login(data.signup)),
    onError: (err: any) => {
      if (err.graphQLErrors[0].extensions.exception.errors) {
        setValidationErrors(err.graphQLErrors[0].extensions.exception.errors);
      }
    },
  });

  const loginHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      loginData({ variables: { email: email, password: password } });
    } else {
      signupData({
        variables: {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        },
      });
    }
  };

  const handleLoginState = (event: MouseEvent<HTMLButtonElement>) => {
    setValidationErrors({});
    setIsLogin((isLogin) => !isLogin);
  };

  // This Mainly consists of Material-UI Buttons and Icons
  // Also shows the Note about duplicate email authentications for users to be aware
  return (
    <div className={classes.Login}>
      <h2>Welcome to the Chat App</h2>
      <div>
        <form onSubmit={loginHandler}>
          {!isLogin && (
            <input
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          {Object.keys(validationErrors).length > 0 && (
            <div className={classes.Errors}>
              <ul>
                {Object.values(validationErrors).map((value: any) => (
                  <li key={value}>*{value}</li>
                ))}
              </ul>
            </div>
          )}
          <Button variant="contained" color="default" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <Button variant="contained" color="default" onClick={handleLoginState}>
          {isLogin ? "Switch to Sign Up" : "Switch to Sign Up"}
        </Button>

        <p>
          ***Note: Minor Validation Error at the moment, please refer to the
          Console for Errors when Authenticating
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
