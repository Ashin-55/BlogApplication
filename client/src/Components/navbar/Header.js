import React, { useEffect, useState } from "react";
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { styled } from "@mui/material/styles";

import DrawerComp from "./DrawerComp";
import { useStyles } from "./headerStyles";
import { ChatState } from "../../Context/ChatProvider";

const Header = ({ premium }) => {
  const { notification, setNotification, setSelectedChat } = ChatState();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [useractive, setUseractive] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const login = () => {
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userInfo2");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const premiumHandler = () => {
    navigate("/premium");
  };

  const userInfo = localStorage.getItem("userInfo");
  useEffect(() => {
    if (userInfo) {
      setUseractive(true);
    }
  }, []);

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
                to='/'
                sx={{
                  fontWeight: "bold",
                  paddingRight: "10%",
                  fontSize: 15,
                  color: "white",
                  textDecoration: "none",
                  fontFamily:"-moz-initial"
                }}
              >
                Be on the ROAD
              </Typography>
              <DrawerComp userInfo={userInfo}/>
            </>
          ) : (
            <>
              <Typography
                component={Link}
                to='/'
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
                Be On The ROAD
              </Typography>
              <Tabs
                sx={{ marginLeft: "10px" }}
                textColor='inherit'
                value={value}
                indicatorColor='primary'
                onChange={(e, value) => setValue(value)}
              >
                <Tab key={"Home"} label={"Home"} component={Link} to={"/"} />
                <Tab
                  key={"Explore"}
                  label={"Explore"}
                  component={Link}
                  to={"/explore"}
                />
                <Tab
                  key={"Writer"}
                  label={"Become a Writer"}
                  component={Link}
                  to={"/author/authorLogin"}
                />
                {userInfo && (
                  <Tab
                    key={"Favorites"}
                    label={"Favorites"}
                    component={Link}
                    to={"/wishlist  "}
                  />
                )}
                {userInfo && (
                  <Tab
                    key={"message"}
                    label={"Chat"}
                    component={Link}
                    to={"/chat"}
                  />
                )}
                {userInfo && (
                  <Tab
                    key={"profile"}
                    label={"Profile"}
                    component={Link}
                    to={"/profile"}
                  />
                )}
              </Tabs>{" "}
              {userInfo && (
                <Box sx={{ marginLeft: "auto" }}>
                  <IconButton
                    onClick={handleClick}
                    size='large'
                    sx={{ ml: 2, color: "white" }}
                    // aria-controls={open ? "account-menu" : undefined}
                    // aria-haspopup='true'
                    // aria-expanded={open ? "true" : undefined}
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
                      >{`Message from ${notif.chat.authers[0].firstName}${notif.chat.authers[0].lastName}`}</MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}
              {userInfo && (
                <Button
                  variant='outlined'
                  color='warning'
                  sx={{ marginRight: "1%" }}
                  onClick={premiumHandler}
                >
                  Premium
                </Button>
              )}
              {userInfo ? (
                <Button variant='contained' onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Button
                  variant='contained'
                  onClick={login}
                  sx={{ marginLeft: "auto", marginRight: "1%" }}
                >
                  Login
                </Button>
              )}
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

export default Header;
