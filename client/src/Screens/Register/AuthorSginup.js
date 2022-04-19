import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useStyle } from "./styles";
import {
  INTIAL_FORM_STATE,
  FORM_VALIDATION,
  FORM_VALIDATION_EDIT,
} from "./regValidation";
import Textfield from "../../Components/textfield/Textfield";
import Button from "../../Components/textfield/Button";
import Header from "../../Components/navbar/Header";
import FooterComp from "../../Components/Footer/FooterComp";

const AuthorSginup = ({
  editProfileId,
  firstName1,
  lastName1,
  email1,
  phone1,
  address1,
  city1,
  state1,
  indroduction1,
  refresh,
  setRefresh,
  setEdit,
}) => {
  toast.configure();
  const editProfileid = editProfileId;
  const classes = useStyle();
  const navigate = useNavigate();
  const autherPresent = localStorage.getItem("authorInfo");

  const config = {
    headers: {
      Authorization: `Bearer ${autherPresent}`,
    },
  };

  const INTIAL_FORM_STATE_EDIT = {
    firstName: firstName1,
    lastName: lastName1,
    email: email1,
    phone: phone1,
    address: address1,
    city: city1,
    state: state1,
    indroduction: indroduction1,
  };

  const handleEdit = async (values) => {
    const newData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      indroduction: values.indroduction,
      authorId: editProfileId,
    };
    axios
      .post("/author/editProfile", newData, config)
      .then((res) => {
        toast("profile Details updated successfully", {
          type: "success",
          autoClose: 3000,
        });
        setEdit(false);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log("the error is =>", error);
        toast("Updation Failed ,Try Again", { type: "error", autoClose: 3000 });
      });
  };

  const handleSubmit = async (values) => {
    console.log(values);
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
    axios
      .post("/author/authorSignup", registerData)
      .then((response) => {
        toast("request sent successfully", {
          type: "success",
          autoClose: 3000,
        });
        navigate("/author/authorLogin");
      })
      .catch((err) => {
        console.log(err);
        toast("email or Mobile number is allready used", {
          type: "error",
          autoClose: 3000,
        });
      });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {!editProfileid && <Header />}
        <Container maxWidth={"md"}>
          <div className={classes.mainRoot}>
            <Typography className={classes.logo}>
              <img src='../../Logo.png' alt='logo' height={100} />
            </Typography>
            <Typography sx={{ fontWeight: 600 }} className={classes.logoText}>
              Be on the ROAD
            </Typography>
            <Typography
              sx={{ fontSize: 30, my: 2 }}
              className={classes.logoSubText}
            >
              {editProfileid ? "Edit Profile" : "Author Registration"}
            </Typography>
            <Formik
              enableReinitialize={true}
              initialValues={
                editProfileid
                  ? { ...INTIAL_FORM_STATE_EDIT }
                  : { ...INTIAL_FORM_STATE }
              }
              validationSchema={
                editProfileid ? FORM_VALIDATION_EDIT : FORM_VALIDATION
              }
              onSubmit={editProfileid ? handleEdit : handleSubmit}
            >
              <Form>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography>Your data</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield
                      name='firstName'
                      label='First Name'
                      size='small'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield name='lastName' label='Last Name' size='small' />
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield
                      name='email'
                      label='Email Address'
                      size='small'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield name='phone' label='Phone Number' size='small' />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>Address</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield name='address' label='Address' size='small' />
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield name='city' label='City Name' size='small' />
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield name='state' label='State' size='small' />
                  </Grid>
                  {!editProfileid && (
                    <Grid item xs={12}>
                      <Typography>PassWord</Typography>
                    </Grid>
                  )}
                  {!editProfileid && (
                    <Grid item xs={12}>
                      <Textfield
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
                    <Textfield
                      name='indroduction'
                      label='Indroduction'
                      multiline={true}
                      rows={4}
                      size='small'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {!editProfileid ? (
                      <Button type='submit'>Request</Button>
                    ) : (
                      <Button type='submit'>Update</Button>
                    )}
                  </Grid>
                </Grid>
              </Form>
            </Formik>
            <Grid contaner>
              {!editProfileid && (
                <Grid item xs={6}>
                  <Typography>
                    All ready have an account{" "}
                    <Link to='/author/authorLogin'>Login</Link>
                  </Typography>
                </Grid>
              )}
              {/* {!editProfileid && (
                <Grid item xs={6}>
                  <Typography sx={{ mx: "auto" }}>
                    Back to <Link to='/'> home </Link>
                  </Typography>
                </Grid>
              )} */}
            </Grid>
          </div>
        </Container>
        {!editProfileid && <FooterComp />}
      </Grid>
    </Grid>
  );
};

export default AuthorSginup;
