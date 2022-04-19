import {
  Backdrop,
  CircularProgress,
  Container,
  FormLabel,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";

import { validationSchema } from "./validation";

const ExploreForm = () => {
  toast.configure();
  const navigate = useNavigate();
  const adminInfo = localStorage.getItem("adminInfo");

  const [base64data1, setBase64data1] = useState("");
  const [base64data2, setBase64data2] = useState("");
  const [base64data3, setBase64data3] = useState("");
  const [base64data4, setBase64data4] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onChangeMethode1 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64data1(base64);
  };
  const onChangeMethode2 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64data2(base64);
  };
  const onChangeMethode3 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64data3(base64);
  };
  const onChangeMethode4 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64data4(base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        console.log("the error was", error);
        reject(error);
      };
    });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };
  const onSubmit = async (values) => {
    setOpen(true)
    const postData = {
      destinationName: values.destinationName,
      indroduction: values.indroduction,
      timeForVisit: values.timeForVisit,
      food: values.food,
      accommodation: values.accommodation,
      transportation: values.transportation,
      safety: values.safety,
      destinationImg: base64data1,
      place1: values.place1,
      place1img: base64data2,
      place2: values.place2,
      place2img: base64data3,
      place3: values.place3,
      place3img: base64data4,
    };

    axios
      .post("/admin/exploreData", postData, config)
      .then((response) => {
        toast(" post created successfully", {
          type: "success",
          autoClose: 2000,
        });
        setOpen(false)
        navigate("/admin/viewExplore");
      })
      .catch((error) => {
        console.log("the error is:", error);
        toast(" post creation failed", { type: "error", autoClose: 2000 });
        setOpen(false)
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  
  return (
    <>
      <Fragment>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
        <Container
          maxWidth='md'
          sx={{
            boxShadow: 1,
            borderRadius: "5%",
            marginY: "5%",
            backgroundColor: "whitesmoke",
            padding: "2% 1% 6% 1%",
          }}
        >
          <Box px={3} py={2}>
            <Typography
              variant='h4'
              align='center'
              margin='dense'
              sx={{ padding: "5%" }}
            >
              Explore Data Content
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  variant='outlined'
                  id='destinationName'
                  name='destinationName'
                  label='Name of the Destination'
                  fullWidth
                  margin='dense'
                  {...register("destinationName")}
                  error={errors.destinationName ? true : false}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.destinationName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  variant='outlined'
                  id='indroduction'
                  name='indroduction'
                  label='Indroduction'
                  fullWidth
                  margin='dense'
                  multiline={true}
                  rows={4}
                  {...register("indroduction")}
                  error={errors.indroduction ? true : false}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.indroduction?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant='outlined'
                  id='bestTime'
                  name='timeForVisit'
                  label='Best Time to Visit'
                  fullWidth
                  margin='dense'
                  multiline={true}
                  rows={2}
                  {...register("timeForVisit")}
                  error={errors.timeForVisit ? true : false}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.timeForVisit?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant='outlined'
                  id='food'
                  name='food'
                  label='Food'
                  fullWidth
                  margin='dense'
                  multiline={true}
                  rows={2}
                  {...register("food")}
                  error={errors.food ? true : false}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.food?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant='outlined'
                  id='accommodation'
                  name='accommodation'
                  label='Accommodation'
                  fullWidth
                  margin='dense'
                  multiline={true}
                  rows={2}
                  {...register("accommodation")}
                  error={errors.accommodation ? true : false}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.accommodation?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant='outlined'
                  id='transportation'
                  name='transportation'
                  label='Transportation'
                  fullWidth
                  margin='dense'
                  multiline={true}
                  rows={2}
                  {...register("transportation")}
                  error={errors.transportation ? true : false}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.transportation?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  variant='outlined'
                  id='safety'
                  name='safety'
                  label='Safety'
                  fullWidth
                  margin='dense'
                  multiline={true}
                  rows={5}
                  {...register("safety")}
                  error={errors.safety ? true : false}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.safety?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  type='file'
                  id='destinationImg'
                  name='destinationImg'
                  label='Destination Image'
                  fullWidth
                  margin='dense'
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("destinationImg")}
                  error={errors.destinationImg ? true : false}
                  onChange={(e) => {
                    onChangeMethode1(e);
                  }}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.destinationImg?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography>Top 3 Places</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant='outlined'
                  id='place1'
                  name='place1'
                  label='Place Name'
                  fullWidth
                  margin='dense'
                  {...register("place1")}
                  error={errors.place1 ? true : false}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.place1?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type='file'
                  id='place1img'
                  name='place1img'
                  label='Place Image'
                  fullWidth
                  margin='dense'
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("place1img")}
                  error={errors.place1img ? true : false}
                  onChange={(e) => {
                    onChangeMethode2(e);
                  }}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.place1img?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant='outlined'
                  id='place2'
                  name='place2'
                  label='Place Name'
                  fullWidth
                  margin='dense'
                  {...register("place2")}
                  error={errors.place2 ? true : false}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.place2?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type='file'
                  id='place2img'
                  name='place2img'
                  label='Place Image'
                  fullWidth
                  margin='dense'
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("place2img")}
                  error={errors.place2img ? true : false}
                  onChange={(e) => {
                    onChangeMethode3(e);
                  }}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.place2img?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant='outlined'
                  id='place3'
                  name='place3'
                  label='Place Name'
                  fullWidth
                  margin='dense'
                  {...register("place3")}
                  error={errors.place3 ? true : false}
                
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.place3?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type='file'
                  id='place3img'
                  name='place3img'
                  label='Place Image'
                  fullWidth
                  margin='dense'
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("place3img")}
                  error={errors.place3img ? true : false}
                  onChange={(e) => {
                    onChangeMethode4(e);
                  }}
                />
                <Typography variant='inherit' color='textSecondary'>
                  {errors.place3img?.message}
                </Typography>
              </Grid>
            </Grid>
            <Box color='secondary.main' mt={3}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleSubmit(onSubmit)}
              >
                Post Now
              </Button>
            </Box>
          </Box>
        </Container>
      </Fragment>
    </>
  );
};

export default ExploreForm;
