import { Box, Container, Typography, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useStyle } from "./styles";
import Skeloton from "../../skeleton/Skeloton";
import AuthorSginup from "../../Screens/Register/AuthorSginup";

const AuthProfile = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const [editProfileid, setEditProfileid] = useState("");
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const authorInfo = localStorage.getItem("authorInfo")
  
  const config = {
    headers: {
      Authorization: `Bearer ${authorInfo}`,
    },
  };

  const editProfileHandler = (id) => {
    setEditProfileid(id);
    setEdit(true);
  };
  const fetchDetails = async (id) => {
    const profileData = await axios.get(`/author/profile/${id}`,config);
    setProfileData(profileData.data.profileData);
    setLoading(false);
  };
  useEffect(() => {
    const authorId = localStorage.getItem("authorId");
    console.log("useefecct called",authorId);
    fetchDetails(authorId);
  }, [refresh]);
  return (
    <>
      {Loading && (
        <Container maxWidth='sm' className={classes.proImageContainer}>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ padding: "5% 0 5% 0" }}>
              <Skeloton />
            </Grid>
          </Grid>
        </Container>
      )}
      {edit ? (
        <AuthorSginup
          editProfileId={editProfileid}
          firstName1={profileData[0].firstName}
          lastName1={profileData[0].lastName}
          email1={profileData[0].email}
          phone1={profileData[0].phone}
          address1={profileData[0].address}
          city1={profileData[0].city}
          state1={profileData[0].state}
          indroduction1={profileData[0].indroduction}
          refresh={refresh}
          setRefresh={setRefresh}
          setEdit={setEdit}
        />
      ) : (
        profileData.map((proData, index) => {
          return (
            <Container key={index} className={classes.proImageContainer}>
              <Typography
                className={classes.title}
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 30,
                  fontWeight: "bold",
                  paddingBottom: "2%",
                }}
              >
                Profile
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
                <Box className={classes.proImageContainer}>
                  <Typography
                    className={classes.profile}
                    component='img'
                    alt='Profile image'
                    src='../../images/profile3.png'
                    width='40%'
                    height='auto'
                    sx={{ paddingBottom: "3%" }}
                  />
                </Box>
                <Typography
                  className={classes.title}
                  sx={{ fontWeight: "bold" }}
                >
                  {proData.firstName} {proData.lastName}
                </Typography>
                <Typography className={classes.title} sx={{ color: "#4b4e52" }}>
                  {proData.email}
                </Typography>
                <Typography className={classes.title} sx={{ color: "#4b4e52" }}>
                  <b> City:</b>
                  {proData.city}
                </Typography>
                <Typography className={classes.title} sx={{ color: "#4b4e52" }}>
                  <b> State:</b>
                  {proData.state}
                </Typography>
                <Typography className={classes.title}>
                  <b> SelfIndroduction</b>
                </Typography>
                <Typography
                  className={classes.title}
                  sx={{ color: "#4b4e52", alignItems: "center" }}
                >
                  <Box sx={{ alignItems: "center", width: "90%" }}>
                    {proData.indroduction}
                  </Box>
                </Typography>
                <Box className={classes.title}>
                  <Button
                    variant='outlined'
                    sx={{ marginTop: "2%" }}
                    onClick={() => {
                      editProfileHandler(proData._id);
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Box>
            </Container>
          );
        })
      )}
    </>
  );
};

export default AuthProfile;
