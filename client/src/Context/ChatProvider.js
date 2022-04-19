import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  let [user, setUser] = useState();
  let [authorData, setauthorData] = useState();
  let [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo2");
    const userInfo2 = JSON.parse(userInfo);
    const authorInfo = JSON.parse(localStorage.getItem("authorInfo2"));
    setUser(userInfo2);
    setauthorData(authorInfo);
    console.log("chat provider authorInfo",authorInfo)
    console.log("chat provider userInfo2",userInfo2)
    // if (!userInfo2) {
    //   navigate("/");
    // }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
        authorData,
        setauthorData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
