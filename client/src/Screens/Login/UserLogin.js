import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Container, Grid, Typography } from "@mui/material";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useStyle } from "./styles.js";
import Header from "../../Components/navbar/Header";
import TextField from "../../Components/textfield/Textfield";
import FooterComp from "../../Components/Footer/FooterComp";
import Button from "../../Components/textfield/Button";

const INTIAL_FORM_STATE = {
  email: "",
  password: "",
};
const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().required("Please enter the email id"),
  password: Yup.string().required("Please enter the password"),
});
const UserLogin = () => {
  toast.configure();
  const classes = useStyle();
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo");

  const responseSuccessGoogle = (response) => {

    //  console.log(response.tokenId)
    // const data = response.tokenId
    axios
      .post("/googleLogin", { data: { tokenId: response.tokenId } })
      .then((result) => {
        if (result.data.permission) {
          localStorage.setItem("userInfo", result.data.token);
          localStorage.setItem("userInfo2", JSON.stringify(result.data));
          localStorage.setItem("userId", result.data._id);
          toast("Login successfull", { type: "success",autoClose:2000 });
          navigate("/");
        } else {
          console.log(result)
          toast("permission to access is blocked by admin :(", { type: "warning" });
        }
      })
      .catch((error) => {
        toast("Login failed Try Again", { type: "error" });
        console.log("login faillllll");
        console.log(error);
      });
  };
  const responseErrorGoogle = (response) => {
    console.log("error response from google",response);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  const loginHandler = async (values) => {
    console.log(values);
    const loginData = {
      email: values.email,
      password: values.password,
    };

    axios
      .post("/login", loginData)
      .then((res) => {
    
        // alert(res.data.message);
        if (res.data.permission) {
          localStorage.setItem("userInfo", res.data.token);
          localStorage.setItem("userInfo2", JSON.stringify(res.data));
          localStorage.setItem("userId", res.data._id);
          toast("Login successfull", { type: "success",autoClose:2000 });
          navigate("/");
        } else {
          toast(res.data.message, { type: "error" });
        }
      })
      .catch((err) => {
        console.log("login failed");
        console.log(err);
        toast("login failed ", { type: "error" });

        navigate("/login");
      });
  };
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
              Login
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
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "2%",
                    }}
                  >
                    <Grid>
                      {/* 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 */}
                      <GoogleLogin
                        clientId='54033475997-q83ic1psia0haeqael0bm58hphg1rtp5.apps.googleusercontent.com'
                        buttonText='login with google'
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Don't have an account{" "}
                      <Link to='/userSignup'>Register</Link>
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

export default UserLogin;
