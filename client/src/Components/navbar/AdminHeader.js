import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./headerStyles";
import DrawerComp from "./DrawerComp";

const AdminHeader = () => {
  const classes = useStyles();
  const authorInfo = localStorage.getItem("authorInfo");
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("adminInfo");
    navigate("/");
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
                  fontSize: 20,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Be on the ROAD
              </Typography>
              <DrawerComp admin={true} />
            </>
          ) : (
            <>
              <Typography
                component={Link}
                to='/admin'
                sx={{
                  fontWeight: "bold",
                  paddingRight: "1%",
                  paddingLeft: ".5%",
                  fontSize: 20,
                  color: "white",
                  textDecoration: "none",
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
                  key={"DashBoard"}
                  label={"DashBoard"}
                  component={Link}
                  to={"/admin"}
                />
                <Tab
                  key={"allUsers"}
                  label={"All User "}
                  component={Link}
                  to={"/admin/alluser"}
                />
                <Tab
                  key={"Premium"}
                  label={"Premium Users"}
                  component={Link}
                  to={"/admin/allPreuser"}
                />
                <Tab
                  key={"authors"}
                  label={"Authors"}
                  component={Link}
                  to={"/admin/authors"}
                />
                <Tab
                  key={"explore"}
                  label={"Explore Data"}
                  component={Link}
                  to={"/admin/viewExplore"}
                />
              </Tabs>
              <Button
                sx={{ marginLeft: "auto" }}
                variant='contained'
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AdminHeader;
