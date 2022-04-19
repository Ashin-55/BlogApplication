import { Container, Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import Textfield from "../textfield/Textfield";
import DateTimePicker from "../textfield/DateTime";
import Button from "../textfield/Button";
const useStyle = makeStyles((theme) => ({
  mainRoot: {
    marginTop: 30,
    marginBottom: 20,
  },
}));

const INTIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  date: "",
  indroduction: "",
};
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("required field"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("invalid email").required("Required"),
  phone: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Required"),
  address: Yup.string().required("Fiil the address"),
  city: Yup.string().required("Enter cityname"),
  state: Yup.string().required("Enter State Name"),
  date: Yup.string().required("Required"),
  indroduction: Yup.string().required("Required"),
});

const RegisterComp = () => {
  const classes = useStyle();
  return (
    <div className={classes.mainRoot}>
      <Formik
        initialValues={{ ...INTIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          console.log("the form data is ");
          console.log(values)
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Your data</Typography>
            </Grid>
            <Grid item xs={6}>
              <Textfield name='firstName' label='First Name' />
            </Grid>
            <Grid item xs={6}>
              <Textfield name='lastName' label='Last Name' />
            </Grid>
            <Grid item xs={12}>
              <Textfield name='email' label='Email Address' />
            </Grid>
            <Grid item xs={12}>
              <Textfield name='phone' label='Phone Number' />
            </Grid>

            <Grid item xs={12}>
              <Typography>Address</Typography>
            </Grid>

            <Grid item xs={12}>
              <Textfield name='address' label='Address' />
            </Grid>
            <Grid item xs={6}>
              <Textfield name='city' label='City Name' />
            </Grid>
            <Grid item xs={6}>
              <Textfield name='state' label='State' />
            </Grid>

            <Grid item xs={12}>
              <Typography>booking information</Typography>
            </Grid>
            <Grid item xs={6}>
              <DateTimePicker name='date' label='Date' />
            </Grid>
            <Grid item xs={12}>
              <Textfield
                name='indroduction'
                label='Indroduction'
                multiline={true}
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button>Submit Form </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterComp;
