import React, { FormEvent, useEffect, useState } from "react";
import SideNav from "../components/SideNav/SideNav";
import Chat from "../components/Chat/Chat";
const ChatScreen = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <Chat />
    </div>
  );
};

export default ChatScreen;
