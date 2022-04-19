import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { ChatState } from "../../Context/ChatProvider";
import Chatloading from "../../skeleton/Chatloading";

let authorToken;
const MyChat = ({ fetchAgain, author }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: author
            ? `Bearer ${authorToken}`
            : `Bearer ${user.token}`,
        },
      };
      const url = author ? "/api/chat/author" : "/api/chat";
      const { data } = await axios.get(url, config);
      // console.log("the servver output", data);
      setChats(data);
    } catch (error) {
      console.log("the error is ::", error);
      alert("this the error");
    }
  };
  useEffect(() => {
    authorToken = localStorage.getItem("authorInfo");
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo2")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      sx={{
        display: {
          xs: selectedChat ? "none" : "flex",
          sm: selectedChat ? "none" : "flex",
          md: "flex",
        },
        borderRadius: 2,
        background: "#c5d8ec",
        borderWidth: "1px",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        width: { xs: "100%", sm: "100%", md: "40%" },
      }}
    >
      <Box
        sx={{
          paddingBottom: 3,
          paddingX: 3,
          fontSize: { xs: "26px", sm: "26px", md: "28px" },
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        Mychats
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "4%",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {chats ? (
          <Stack overflow='scroll'>
            {chats.length === 0 && (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "25%",
                  fontSize: "25px",
                }}
              >
                {" "}
                {!author?("make chat with new authors..."):("  wait until any users message you.....")}
               
              </span>
            )}
            {chats.map((chat) => (
              <Box
                onClick={() => {
                  setSelectedChat(chat);
                }}
                sx={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedChat === chat ? "#38B2Ac" : "#e8E8E8",
                  color: selectedChat === chat ? "white" : "black",
                  paddingX: 2,
                  paddingY: 2,
                  marginY: 0.5,
                  borderRadius: 1,
                }}
                key={chat._id}
              >
                <Typography>
                  {author
                    ? `${chat.users[0].firstName} ${chat.users[0].lastName}`
                    : `${chat.authers[0].firstName}  ${chat.authers[0].lastName}`}
                  {/* {
                    console.log(chat),
                    console.log(chat.users.length),
                    console.log("loggedUse", loggedUser)
                  }  */}
                  {/* {chat.authers.length > 0 && chat.users.length > 0
                    ? chat.authers[0].firstName
                    : "No chats"} */}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <Chatloading />
        )}
      </Box>
    </Box>
  );
};

export default MyChat;
