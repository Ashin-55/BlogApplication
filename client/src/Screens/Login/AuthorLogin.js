import axios from "axios";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Container, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStyle } from "./styles.js";
import "react-toastify/dist/ReactToastify.css";

import TextField from "../../Components/textfield/Textfield";
import Button from "../../Components/textfield/Button";
import Header from "../../Components/navbar/Header";
import FooterComp from "../../Components/Footer/FooterComp";

const AuthorLogin = () => {
  toast.configure();
  const classes = useStyle();
  const navigate = useNavigate();
  const autherPresent = localStorage.getItem("authorInfo");

  const INTIAL_FORM_STATE = {
    email: "",
    password: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().required("Please enter the email id"),
    password: Yup.string().required("Please enter the password"),
  });
  const loginHandler = async (values) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    axios
      .post("/author/authorLogin", loginData)
      .then((res) => {
        console.log("the response is ", res);
        toast(res.data.message, { type: "success" });
        localStorage.setItem("authorInfo", res.data.token);
        localStorage.setItem("authorId", res.data._id);
        localStorage.setItem("authorFirstname", res.data.firstName);
        localStorage.setItem("authorInfo2",JSON.stringify(res.data))
        navigate("/author");
      })
      .catch((err) => {
        console.log(err);
        toast("Login Failed", { type: "error" });
        navigate("/author/authorLogin");
      });
  };
  useEffect(() => {
    if (autherPresent) {
      navigate("/author");
    } else {
      navigate("/author/authorLogin");
    }
  }, []);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
        <Container maxWidth='md'>
          <div className={classes.mainRoot}>
            <Typography className={classes.logo}>
              <img src='../../Logo.png' alt='logo' height={100} />
            </Typography>
            <Typography sx={{ fontWeight: 600 }} className={classes.logoText}>
              Be on the ROAD
            </Typography>
            <Typography sx={{ fontSize: 30 }} className={classes.logoSubText}>
              Author Login
            </Typography>
            <Formik
              initialValues={{ ...INTIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={loginHandler}
            >
              <Form>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography>Enter Email</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name='email' label='Email' size='small' />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Enter Password</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='password'
                      label='Password'
                      size='small'
                      type='password'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button>Login</Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      Don't have an account {"\u00A0"}
                      <Link to='/author/authorSignup'>Register</Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>
                      <Link to='/'> Home</Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
        <FooterComp />
      </Grid>
    </Grid>
  );
};

export default AuthorLogin;
