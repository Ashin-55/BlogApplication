import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Container, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useStyle } from "./styles";
import {
  INTIAL_FORM_STATE,
  FORM_VALIDATION,
  FORM_VALIDATION_EDIT,
} from "./regValidation";
import TextField from "../../Components/textfield/Textfield";
import Button from "../../Components/textfield/Button";
import Header from "../../Components/navbar/Header";
import FooterComp from "../../Components/Footer/FooterComp";

const UserSignup = ({ profileId, profileData,setEdit,setRefresh,refresh }) => {
  toast.configure();
  const classes = useStyle();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo2"));
  const [editFinished, setEditFinished] = useState(false);

  const INTIAL_FORM_STATE_EDIT = {
    firstName: profileData?.firstName,
    lastName: profileData?.lastName,
    email: profileData?.email,
    phone: profileData?.phone,
    address: profileData?.address,
    city: profileData?.city,
    state: profileData?.state,
    indroduction: profileData?.indroduction,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`,
    },
  };

  const editHandlerSubmit = async (values) => {
    console.log(values);
    const updatedData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      indroduction: values.indroduction,
    };
    axios
      .put(`/editProfile/${profileId}`, updatedData, config)
      .then((resposne) => {
        console.log(resposne);
        toast(` ${resposne.data.message}`, {
          type: "success",
        });
        setEdit(false)
        setRefresh(!refresh)
      })
      .catch((err) => {
        console.log(err);
        toast("failed to update,Try again later", {
          type: "error",
        });
      });
  };
  const handleSubmit = async (values) => {
    // console.log(values);
    const registerData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      password: values.password,
      indroduction: values.indroduction,
    };
    const response = await axios
      .post("/signup", registerData)
      .then((res) => {
        console.log(res.data.message);
        toast(`verification code sent to ${res.data.message}`, {
          type: "success",
        });
        navigate("/verification");
      })
      .catch((e) => {
        console.log(e);
        toast(`Try Agin, Email or Phone Number allready used`, {
          type: "error",
        });
        navigate("/userSignup");
      });
  };

  return (
    <Grid container>
      {!editFinished ? (
        <Grid item xs={12}>
          {!profileId && <Header />}
          <Container maxWidth='md'>
            <div className={classes.mainRoot}>
              <Typography className={classes.logo}>
                <img src='../../Logo.png' alt='logo' height={100} />
              </Typography>
              <Typography sx={{ fontWeight: 600 }} className={classes.logoText}>
                Be on the ROAD
              </Typography>
              <Typography sx={{ fontSize: 30 }} className={classes.logoSubText}>
                {!profileId ? "User Signup" : "Edit Profile"}
              </Typography>
              <Formik
                initialValues={
                  profileId
                    ? { ...INTIAL_FORM_STATE_EDIT }
                    : { ...INTIAL_FORM_STATE }
                }
                validationSchema={
                  profileId ? FORM_VALIDATION_EDIT : FORM_VALIDATION
                }
                onSubmit={profileId ? editHandlerSubmit : handleSubmit}
              >
                <Form>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography>Your data</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name='firstName'
                        label='First Name'
                        size='small'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name='lastName'
                        label='Last Name'
                        size='small'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name='email'
                        label='Email Address'
                        size='small'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name='phone'
                        label='Phone Number'
                        size='small'
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography>Address</Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField name='address' label='Address' size='small' />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField name='city' label='City Name' size='small' />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField name='state' label='State' size='small' />
                    </Grid>
                    {!profileId && (
                      <Grid item xs={12}>
                        <Typography>PassWord</Typography>
                      </Grid>
                    )}
                    {!profileId && (
                      <Grid item xs={12}>
                        <TextField
                          name='password'
                          label='Password'
                          type='password'
                          size='small'
                        />
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <Typography>Self Indroduction</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='indroduction'
                        label='Indroduction'
                        multiline={true}
                        rows={4}
                        size='small'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {profileId ? (
                        <Button>Update</Button>
                      ) : (
                        <Button>Register</Button>
                      )}
                    </Grid>
                    {!profileId && (
                      <Grid item xs={6}>
                        <Typography>
                          All ready have an account{" "}
                          <Link to='/login'>Login</Link>
                        </Typography>
                      </Grid>
                    )}
                    {!profileId && (
                      <Grid item xs={6}>
                        <Typography sx={{ mx: "auto" }}>
                          <Link to='/'>Back to home</Link>
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Form>
              </Formik>
            </div>
          </Container>
          {!profileId && <FooterComp />}
        </Grid>
      ) : null}
    </Grid>
  );
};

export default UserSignup;
