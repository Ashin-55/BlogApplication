import React, { useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./headerStyles";
import DrawerComp from "./DrawerComp";
import { ChatState } from "../../Context/ChatProvider";

const AuthHeader = () => {
  const classes = useStyles();
  const { notification, setNotification, setSelectedChat } = ChatState();
  const authorInfo = localStorage.getItem("authorInfo");
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.removeItem("authorInfo");
    localStorage.removeItem("authorFirstname");
    localStorage.removeItem("authorId");
    localStorage.removeItem("authorInfo2");

    navigate("/author/authorLogin");
  };
  return (
    <>
      <AppBar
        sx={{ background: "#0E185F", marginBottom: "3%" }}
        position='static'
      >
        <Toolbar>
          {isMatch ? (
            <>
              <Typography
                component={Link}
                to='/author'
                sx={{
                  fontWeight: "bold",
                  paddingRight: "10%",
                  paddingLeft: ".5%",
                  fontSize: 15,
                  color: "white",
                  textDecoration: "none",
                  fontFamily:"-moz-initial"
                }}
              >
                Be on the ROAD
              </Typography>
              <DrawerComp author={true} />
            </>
          ) : (
            <>
              <Typography
                component={Link}
                to='/author'
                sx={{
                  fontWeight: "bold",
                  paddingRight: "1%",
                  paddingLeft: ".5%",
                  fontSize: 15,
                  color: "white",
                  textDecoration: "none",
                  fontFamily:"-moz-initial"
                }}
              >
                Be on the ROAD
              </Typography>
              <Tabs
                sx={{ marginLeft: "10px" }}
                textColor='inherit'
                value={value}
                indicatorColor='primary'
                onChange={(e, value) => setValue(value)}
              >
                <Tab
                  key={"home"}
                  label={"Home"}
                  component={Link}
                  to={"/author"}
                />{" "}
                <Tab
                  key={"explore"}
                  label={"Explore"}
                  component={Link}
                  to={"/author/explore"}
                />
                <Tab
                  key={"newPost"}
                  label={"NeW Post "}
                  component={Link}
                  to={"/author/newpost"}
                />
                {/* <Tab
                  key={"activity"}
                  label={"activity"}
                  component={Link}
                  to={"/author/activity"}
                /> */}
                <Tab
                  key={"mesage"}
                  label={"Messages"}
                  component={Link}
                  to={"/author/chat"}
                />
                <Tab
                  key={"mypost"}
                  label={"MyPost"}
                  component={Link}
                  to={"/author/mypost"}
                />
                <Tab
                  key={"profile"}
                  label={"Profile"}
                  component={Link}
                  to={"/author/profile"}
                />
              </Tabs>

              <Box sx={{ marginLeft: "auto", marginRight: "30px" }}>
                <IconButton
                  onClick={handleClick}
                  size='large'
                  sx={{ color: "white" }}
                >
                  <Badge badgeContent={notification.length} color='error'>
                    <NotificationsActiveIcon />
                  </Badge>
                </IconButton>
                <Menu
                  id='basic'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  {!notification.length && (
                    <span style={{ padding: `10px` }}> No new messages </span>
                  )}

                  {notification.map((notif) => (
                    <MenuItem
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(
                          notification.filter((n) => n !== notif)
                        );
                      }}
                    >{`Message from ${notif.chat.users[0].firstName} ${notif.chat.users[0].lastName}`}</MenuItem>
                  ))}
                </Menu>
              </Box>

              <Button
                // sx={{ marginLeft: "30px" }}
                variant='contained'
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.mainlogo}>
        <img
          src='../../images/MainLogo.png'
          alt='logo'
          style={{ width: "30%", height: "auto" }}
        />
      </Toolbar>
      <Toolbar className={classes.tagline} sx={{ marginBottom: "2.5%" }}>
        OFFBEAT PLACES UNTOLD STORIES
      </Toolbar>
    </>
  );
};

export default AuthHeader;
