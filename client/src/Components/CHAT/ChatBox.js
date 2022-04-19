import { Box } from "@mui/material";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import SingleChat from "./SingleChat";
const ChatBox = ({ fetchAgain, setFetchAgain,author }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      sx={{
        display: {
          xs: selectedChat ? "flex" : "none",
          sm: selectedChat ? "flex" : "none",
          md: "flex",
        },
        flexDirection: "column",
        padding: 3,
        marginX:1,
        background: "#c5d8ec",
        width: { xs: "100%", sm: "100%", md: "58%" },
        borderRadius: 2,
        borderWidth: "2px",
        alignItems: "center",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} author={author}/>
    </Box>
  );
};

export default ChatBox;
