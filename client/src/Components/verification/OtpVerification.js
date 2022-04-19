import axios from "axios";
import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TextField from "../../Components/textfield/Textfield";
import Button from "../../Components/textfield/Button";
const useStyle = makeStyles((theme) => ({
  mainRoot: {
    marginTop: "10%",
    padding: "5% 10% 10% 10%",
    boxShadow: "-9px 14px 47px -2px rgba(84,80,84,0.77)",
    borderRadius: 20,
    border: 4,
  },
  logo: {
    display: "flex",
    justifyContent: "center",
  },
  logoText: {
    fontFamily: "Poppins",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
  },
  logoSubText: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 39,
    display: "flex",
    justifyContent: "center",
  },
}));

const OtpVerification = () => {
  const navigate = useNavigate();
  const classes = useStyle();
  const INTIAL_FORM_STATE = {
    num1: "",
    num2: "",
    num3: "",
    num4: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    num1: Yup.number()
      .typeError("you must specify a number")
      .integer()
      .required("require"),
    num2: Yup.number()
      .typeError("you must specify a number")
      .integer()
      .required("require"),
    num3: Yup.number()
      .typeError("you must specify a number")
      .integer()
      .required("require"),
    num4: Yup.number()
      .typeError("you must specify a number")
      .integer()
      .required("require"),
  });

  const verificationHandler = async (values) => {
    toast.configure();
    const otp = values.num1 + values.num2 + values.num3 + values.num4;
    const data = { otp };
    await axios
      .post("/verification", data)
      .then((response) => {
        console.log(response);
        toast("Verification Success! ", { type: "success" });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast("invalid otp", { type: "error" });
        navigate("/verification");
      });
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth={"xs"} sx={{ mt: "50px" }}>
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
              Verification
            </Typography>
            <Formik
              initialValues={{ ...INTIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={verificationHandler}
            >
              <Form>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography>Enter the Verification Code</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField name='num1' inputProps={{ maxLength: 1 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField name='num2' inputProps={{ maxLength: 1 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField name='num3' inputProps={{ maxLength: 1 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField name='num4' inputProps={{ maxLength: 1 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button>Verify</Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <Link to='/home'>Back to home page</Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default OtpVerification;
