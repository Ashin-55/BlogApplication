import { Container, Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyle } from "./styles";
import UserSignup from "../../Screens/Register/UserSignup";
import Skeloton from "../../skeleton/Skeloton";

const UserProfileComp = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo2"));
  const [profileData, setProfileData] = useState({});
  const [profileId, setProfileId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const editProfileHandler = async (id) => {
    setEdit(true);
  };
  const fetchProfileData = async (id) => {
    try {
      const { data } = await axios.get(`/profileDetails/${id}`, config);
      setProfileData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(userInfo.firstName);
    if (userInfo) {
      setProfileId(userInfo._id);
      fetchProfileData(userInfo._id);
    } else {
      navigate("/login");
    }
  }, [refresh]);
  return (
    <>
      {loading ? (
        <Container maxWidth='sm' className={classes.proImageContaier}>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ padding: "5% 0 5% 0" }}>
              <Skeloton />
            </Grid>
          </Grid>
        </Container>
      ) : edit ? (
        <>
          {console.log(profileId)}
          <UserSignup
            profileId={profileId}
            profileData={profileData}
            refresh={refresh}
            setRefresh={setRefresh}
            setEdit={setEdit}
          />
        </>
      ) : (
        <Container
          className={classes.proImageContaier}
          sx={{ marginBottom: "3%" }}
        >
          <Typography
            className={classes.title}
            sx={{
              fontFamily: "Poppins",
              fontSize: 30,
              fontWeight: "bold",
              paddingBottom: "2%",
            }}
          >
            PROFILE
          </Typography>
          <Box
            sx={{
              boxShadow: 3,
              borderRadius: 5,
              paddingY: "3%",
              maxWidth: "50%",
              marginX: "25%",
              backgroundColor: "whitesmoke",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                className={classes.profile}
                component='img'
                alt='Profile image'
                src='../../images/profile3.png'
                width='40%'
                height='auto'
                sx={{ paddingBottom: "3%" }}
              />
            </Grid>
            <Typography className={classes.title} sx={{ fontWeight: "bold" }}>
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography className={classes.title} sx={{ color: "#4b4e52" }}>
              {profileData.email}
            </Typography>
            <Typography className={classes.title} sx={{ color: "#4b4e52" }}>
              <b> City:</b>
              {profileData.city}
            </Typography>
            <Typography className={classes.title} sx={{ color: "#4b4e52" }}>
              <b> State:</b>
              {profileData.state}
            </Typography>
            <Typography className={classes.title}>
              <b> SelfIndroduction</b>
            </Typography>
            <Typography
              className={classes.title}
              sx={{ color: "#4b4e52", alignItems: "center" }}
            >
              <Box sx={{ alignItems: "center", width: "90%" }}>
                {profileData.indroduction}
              </Box>
            </Typography>
            <Box className={classes.title}>
              <Button
                variant='outlined'
                sx={{ marginTop: "2%" }}
                onClick={() => {
                  editProfileHandler(profileData._id);
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default UserProfileComp;
