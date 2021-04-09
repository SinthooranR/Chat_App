import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setUser } from "./features/userSlice";
import ChatScreen from "./views/ChatScreen";
import LoginPage from "./views/LoginPage";

function App() {
  const user = useSelector(setUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem("token", user.token);
    }
  }, [user]);

  return <div>{user ? <ChatScreen /> : <LoginPage />}</div>;
}

export default App;
