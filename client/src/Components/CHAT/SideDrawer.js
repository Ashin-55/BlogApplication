import {
  Box,
  Tooltip,
  Button,
  Drawer,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ChatState } from "../../Context/ChatProvider";
import Chatloading from "../../skeleton/Chatloading";
import UserListItem from "../ChatUserlistItem/UserListItem";
import { getSender } from "../../ChatConfig/ChatLogic";

const SideDrawer = ({ author }) => {
  toast.configure();
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const [OpenDrawer, setOpenDrawer] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = async () => {
    if (!search) {
      toast("Enter something", {
        type: "warning",
        autoClose: 1000,
        position: "top-right",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast("error occured", {
        type: "error",
        autoClose: 1000,
        position: "top-right",
      });
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setLoading(false);
      setSelectedChat(data);
      setOpenDrawer(false);
    } catch (error) {
      toast("error occured", {
        type: "error",
        autoClose: 1000,
        position: "top-right",
      });
    }
  };
  return (
    !author && (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "grey",
            width: "100%",
            marginTop: "1%",
          }}
        >
          <Tooltip title='Search users to chat ' arrow placement='bottom'>
            <Button variant='outlined' onClick={() => setOpenDrawer(true)}>
              <SearchIcon />
              <Typography> Search Author</Typography>
            </Button>
          </Tooltip>
        </Box>
        <Drawer open={OpenDrawer} onClose={() => setOpenDrawer(false)}>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText>Search Author</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </List>
          <List>
            <Box display='flex' padding={2}>
              <TextField
                placeholder='Author Name or Email'
                sx={{ marginX: "2%" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant='outlined' onClick={handleSearch}>
                Go
              </Button>
            </Box>
            {loading ? (
              <Chatloading />
            ) : (
              searchResult?.map((users) => (
                <UserListItem
                  alignItems='center'
                  key={users._id}
                  user={users}
                  handleFunction={() => accessChat(users._id)}
                />
              ))
            )}
            {loadingChat && (
              <CircularProgress sx={{ marginLeft: "auto", display: "flex" }} />
            )}
          </List>
        </Drawer>
      </>
    )
  );
};

export default SideDrawer;
