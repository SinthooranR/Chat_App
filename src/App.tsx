import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, login, logout } from "./features/userSlice";
import ChatScreen from "./views/ChatScreen";
import LoginPage from "./views/LoginPage";
import { auth } from "./firebase";

function App() {
  const user = useSelector(setUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is:", authUser);
      if (authUser) {
        // the user is logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        // user is logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div style={{ display: "flex" }}>
      <Switch>
        {user ? (
          <Route exact path="/" component={ChatScreen} />
        ) : (
          <Route exact path="/" component={LoginPage} />
        )}
      </Switch>
    </div>
  );
}

export default App;
