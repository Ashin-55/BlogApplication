import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  FormControl,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ChatState } from "../../Context/ChatProvider";
import { getSender } from "../../ChatConfig/ChatLogic";
import ScrollableChat from "./ScrollableChat";
import "../../Components/styles.css";
import SmileFace from "../animaton/SmileFace";

const ENDPOINT = "https://beontheroads.herokuapp.com";
let authorToken, socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain, author }) => {
  toast.configure();
  const {
    user,
    authorData,
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
  } = ChatState();
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [newMessages, setNewMessages] = React.useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let authorDetail;
    if (author) {
      authorDetail = authorData
        ? authorData
        : JSON.parse(localStorage.getItem("authorInfo2"));
    }

    socket = io(ENDPOINT);
    author ? socket.emit("setup", authorDetail) : socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    authorToken = localStorage.getItem("authorInfo");
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //give notification
        console.log("in notification part");
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        console.log("in msg part");
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: author
            ? `Bearer ${authorToken}`
            : `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const url = author
        ? `/api/message/author/${selectedChat._id}`
        : `/api/message/${selectedChat._id}`;
      const { data } = await axios.get(url, config);
      console.log("the message::", messages);
      console.log("the message::", data);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log("the fetching error is that ::", error);
      toast("error occured", {
        type: "error",
        autoClose: 1000,
        position: "top-right",
      });
    }
  };
  const typingHandler = (e) => {
    setNewMessages(e.target.value);
    //typing indicator
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessages) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: author
              ? `Bearer ${authorToken}`
              : `Bearer ${user.token}`,
          },
        };
        setNewMessages("");
        const url = author ? `/api/message/author` : `/api/message`;
        console.log(`${url}`);
        const { data } = await axios.post(
          `${url}`,
          { content: newMessages, chatId: selectedChat._id },
          config
        );
        console.log(data);
        author
          ? socket.emit("new messageAuthor", data)
          : socket.emit("new message", data);

        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
        alert("error occured");
      }
    }
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Typography
            alignItems='center'
            display='flex'
            justifyContent='space-between'
            width='100%'
            fontSize={{ xs: "20px", sm: "20px", md: "25px" }}
            paddingBottom={3}
            paddingX={2}
            fontFamily='Poppins'
          >
            <IconButton
              onClick={() => setSelectedChat("")}
              sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
            >
              <ArrowBackIcon />
            </IconButton>
            {author
              ? `${selectedChat.users[0].firstName} ${selectedChat.users[0].lastName}`
              : `${selectedChat.authers[0].firstName}  ${selectedChat.authers[0].lastName}`}
            {/* {selectedChat.authers[0].firstName.toUpperCase()} */}
          </Typography>
          <Box
            sx={{
              padding: 2,
              justifyContent: "flex-end",
              display: "flex",
              overflowY: "hidden",
              borderRadius: 3,
              flexDirection: "column",
              background: "#ffffff",
              width: "100%",
              height: "100%",
            }}
          >
            {loading ? (
              <CircularProgress
                sx={{
                  size: "25px",
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  margin: "auto",
                }}
              />
            ) : (
              <div className='messages'>
                <ScrollableChat messages={messages} author={author} />
              </div>
            )}

            <FormControl>
              {isTyping ? (
                <div style={{ color: "#757678" }}>typping...</div>
              ) : (
                <></>
              )}
              <TextField
                variant='outlined'
                background='#E0E0E0'
                placeholder='Enter Message..'
                onChange={typingHandler}
                onKeyDown={sendMessage}
                value={newMessages}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{ fontSize: 28, paddingBottom: 3, fontFamily: "Poppins" }}
          >
            {author ? (
              <>
                <SmileFace />
                <span style={{ display: "flex", justifyContent: "center" }}>
                  Click any user to Chat
                </span>
              </>
            ) : (
              <>
                <SmileFace />
                <span style={{ display: "flex", justifyContent: "center" }}>
                  Click any author to Chat
                </span>
              </>
            )}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
