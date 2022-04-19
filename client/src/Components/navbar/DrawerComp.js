import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useNavigate } from "react-router-dom";
const DrawerComp = (props) => {
  console.log(props);
  const navigate = useNavigate();
  const [OpenDrawer, setOpenDrawer] = useState(false);
 
  const logoutAdmin=()=>{
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  }
  const logoutauth=()=>{
    localStorage.removeItem("authorInfo");
    localStorage.removeItem("authorFirstname");
    localStorage.removeItem("authorId");
    localStorage.removeItem("authorInfo2");
    navigate("/author/authorLogin");
  }

  const logout = () => {
    setOpenDrawer(false);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userInfo2");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      <Drawer open={OpenDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {props.author ? (
            <>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"home"}
                component={Link}
                to='/author'
              >
                <ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"explore"}
                component={Link}
                to='/author/explore'
              >
                <ListItemIcon>
                  <ListItemText>Explore</ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"newpost"}
                component={Link}
                to='/author/newpost'
              >
                <ListItemIcon>
                  <ListItemText>NewPost</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"chat"}
                component={Link}
                to='/author/chat'
              >
                <ListItemIcon>
                  <ListItemText>Messages</ListItemText>
                </ListItemIcon>
              </ListItemButton>

             

              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"mypost"}
                component={Link}
                to='/author/mypost'
              >
                <ListItemIcon>
                  <ListItemText>MyPost</ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"Profile"}
                component={Link}
                to='/author/profile'
              >
                <ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              
              <ListItemButton
                onClick={logoutauth}
                key={"logoutauth"}
                component={Link}
                to='/author/authorLogin'
              >
                <ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          ) : props.admin ? (
            <>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"Dashboard"}
                component={Link}
                to='/admin'
              >
                <ListItemIcon>
                  <ListItemText>Dashboard</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"allUser"}
                component={Link}
                to='/admin/alluser'
              >
                <ListItemIcon>
                  <ListItemText>All Users</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"premium"}
                component={Link}
                to='/admin/allPreuser'
              >
                <ListItemIcon>
                  <ListItemText>All Premium Users</ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"authors"}
                component={Link}
                to='/admin/authors'
              >
                <ListItemIcon>
                  <ListItemText>All Authors</ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"viewExplore"}
                component={Link}
                to='/admin/viewExplore'
              >
                <ListItemIcon>
                  <ListItemText>Explore Data</ListItemText>
                </ListItemIcon>
              </ListItemButton>


              <ListItemButton
                onClick={logoutAdmin}
                key={"logoutAdmin"}
                component={Link}
                to='/admin/login'
              >
                <ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"home"}
                component={Link}
                to='/'
              >
                <ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"explore"}
                component={Link}
                to='/explore'
              >
                <ListItemIcon>
                  <ListItemText>Explore</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"becomewriter"}
                component={Link}
                to='/author/authorLogin'
              >
                <ListItemIcon>
                  <ListItemText>Become a Writer</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              {props.userInfo && (
                <ListItemButton
                  onClick={() => setOpenDrawer(false)}
                  key={"favorites"}
                  component={Link}
                  to='/wishlist'
                >
                  <ListItemIcon>
                    <ListItemText>Favorites</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              )}
              {props.userInfo && (
                <ListItemButton
                  onClick={() => setOpenDrawer(false)}
                  key={"message"}
                  component={Link}
                  to='/chat'
                >
                  <ListItemIcon>
                    <ListItemText>Chat</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              )}

              {props.userInfo && (
                <ListItemButton
                  onClick={() => setOpenDrawer(false)}
                  key={"Profile"}
                  component={Link}
                  to='/profile'
                >
                  <ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              )}

              {props.userInfo && (
                <ListItemButton
                  onClick={() => setOpenDrawer(false)}
                  key={"premium"}
                  component={Link}
                  to='/premium'
                >
                  <ListItemIcon>
                    <ListItemText>Premium</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              )}

              {props.userInfo ? (
                <ListItemButton
                  onClick={logout}
                  key={"logout"}
                  component={Link}
                  to='/login'
                >
                  <ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ) : (
                <ListItemButton
                  onClick={() => setOpenDrawer(false)}
                  key={"login"}
                  component={Link}
                  to='/login'
                >
                  <ListItemIcon>
                    <ListItemText>Login</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              )}
            </>
          )}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!OpenDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
