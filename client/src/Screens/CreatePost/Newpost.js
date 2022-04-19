import {
  Box,
  TextField,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import axios from "axios";

import AuthHeader from "../../Components/navbar/AuthHeader";
import FooterComp from "../../Components/Footer/FooterComp";
import { validationSchema } from "./validation";
import GraphSkell from "../../skeleton/GraphSkell";

let authorId;
let authorInfo;
const Newpost = ({ editpostid, setRefresh, refresh, setEdit }) => {
  authorId = localStorage.getItem("authorId")
  authorInfo = localStorage.getItem("authorInfo")
  const config = {
    headers: {
      Authorization: `Bearer ${authorInfo}`,
    },
  };
  const editPostId = editpostid;
  toast.configure();
  const navigate = useNavigate();
  const [base64data1, setBase64data1] = useState("");
  const [base64data2, setBase64data2] = useState("");
  const [base64data3, setBase64data3] = useState("");
  const [base64data4, setBase64data4] = useState("");
  const [base64data5, setBase64data5] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh2, setRefresh2] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  //backdrop function
 
  const onChangeMethod1 = async (e) => {
    console.log("handleinput change 1");
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64data1(base64);
  };
  const onChangeMethod2 = async (e) => {
    console.log("handleinput change2 ");
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64data2(base64);
  };
  const onChangeMethod3 = async (e) => {
    console.log("handleinput change 3 ");
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64data3(base64);
  };
  const onChangeMethod4 = async (e) => {
    console.log("handleinput change 4");
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64data4(base64);
  };
  const onChangeMethod5 = async (e) => {
    console.log("handleinput change 5");
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64data5(base64);
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

  const onEdit = async (data) => {
    setOpen(!open);
    let IMG1, IMG2, IMG3, IMG4, IMG5;
    if (typeof data.img1 === "string") {
      IMG1 = data.img1;
    } else {
      IMG1 = base64data1;
    }
    if (typeof data.img2 === "string") {
      IMG2 = data.img2;
    } else {
      IMG2 = base64data2;
    }
    if (typeof data.img3 === "string") {
      IMG3 = data.img3;
    } else {
      IMG3 = base64data3;
    }
    if (typeof data.img4 === "string") {
      IMG4 = data.img4;
    } else {
      IMG4 = base64data4;
    }
    if (typeof data.img5 === "string") {
      IMG5 = data.img5;
    } else {
      IMG5 = base64data5;
    }
    const postData = {
      postTitle: data.mainTitle,
      subTitle: data.subTitle,
      postIndroduction: data.indroduction,
      postContent: data.postContent,
      place: data.place,
      date: data.date,
      image1: IMG1,
      image2: IMG2,
      image3: IMG3,
      image4: IMG4,
      image5: IMG5,
      authorId: data.authorId,
      postid: editPostId,
    };
    await axios.post("/author/editPost", postData,config).then((result) => {
      setOpen(false);
      toast(" post updated successfully", { type: "success", autoClose: 2000 });
      setEdit(false);
      setRefresh(!refresh);
    });
  };
  const onSubmit = async (data) => {
    setOpen(!open);
    const postData = {
      postTitle: data.mainTitle,
      subTitle: data.subTitle,
      postIndroduction: data.indroduction,
      postContent: data.postContent,
      place: data.place,
      date: data.date,
      image1: base64data1,
      image2: base64data2,
      image3: base64data3,
      image4: base64data4,
      image5: base64data5,
      authorId: data.authorId,
    };

    await axios
      .post("/author/newpost", postData,config)
      .then((res) => {
        setOpen(false);
        console.log("post created successfull");
        toast(" New post created successfully", { type: "success" });
        navigate("/author/mypost");
      })
      .catch((err) => {
        setOpen(false);
        toast("Something went wrong!! try again", { type: "error" });
        console.log("post  error resposnse from server new post", err);
      });
  };

  const fetchEditData = async (postid) => {
    setOpen(!open);
    const { data } = await axios.get(`/author/editPost/${postid}`,config);
    setOpen(false);
    reset({
      mainTitle: data.postTitle,
      subTitle: data.subTitle,
      indroduction: data.postIndroduction,
      place: data.place,
      date: moment(data.date).format("yyyy-MM-DD"),
      postContent: data.postContent,
      img1: data.image1,
      img2: data.image2,
      img3: data.image3,
      img4: data.image4,
      img5: data.image5,
      authorId: data.authorId,
    });
  };
  useEffect(() => {
    authorId = localStorage.getItem("authorId")
    editPostId && fetchEditData(editPostId);
    console.log("use effet called ",authorId);
    setLoading(false);
  }, [refresh2]);

  return (
    <>
      {!editPostId && <AuthHeader />}
      {loading ? (
        
          <Grid container spacing={2}>
            <Grid item sm={12} md={12} lg={12} align='center'>
              <GraphSkell />
            </Grid>
          </Grid>
        
      ) : (
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
              marginTop: "2%",
              backgroundColor: "whitesmoke",
              padding: "2% 1% 4% 1%",
              marginBottom:"2%"
            }}
          >
            <Box px={3} py={2}>
              <Typography variant='h6' align='center' margin='dense'>
                {editPostId ? "Edit Post" : "Create new Post"}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    variant='outlined'
                    id='mainTitle'
                    name='mainTitle'
                    label='Main Title'
                    fullWidth
                    margin='dense'
                    {...register("mainTitle")}
                    InputLabelProps={editPostId && { shrink: true }}
                    error={errors.mainTitle ? true : false}
                  />
                  <Typography variant='inherit' color='textSecondary'>
                    {errors.mainTitle?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    variant='outlined'
                    id='subTitle'
                    name='subTitle'
                    label='Sub Title'
                    fullWidth
                    margin='dense'
                    InputLabelProps={editPostId && { shrink: true }}
                    {...register("subTitle")}
                    error={errors.subTitle ? true : false}
                  />
                  <Typography variant='inherit' color='textSecondary'>
                    {errors.subTitle?.message}
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
                    InputLabelProps={editPostId && { shrink: true }}
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
                    id='place'
                    name='place'
                    label='Place'
                    fullWidth
                    margin='dense'
                    InputLabelProps={editPostId && { shrink: true }}
                    {...register("place")}
                    error={errors.place ? true : false}
                  />
                  <Typography variant='inherit' color='textSecondary'>
                    {errors.place?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    variant='outlined'
                    id='date'
                    name='date'
                    label='Date'
                    type='date'
                    fullWidth
                    margin='dense'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("date")}
                    error={errors.date ? true : false}
                  />
                  <Typography variant='inherit' color='textSecondary'>
                    {errors.date?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id='postContent'
                    name='postContent'
                    label='Content'
                    multiline={true}
                    rows={4}
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    InputLabelProps={editPostId && { shrink: true }}
                    {...register("postContent")}
                    error={errors.postContent ? true : false}
                  />
                  <Typography variant='inherit' color='textSecondary'>
                    {errors.postContent?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    type='file'
                    id='img12'
                    name='img1'
                    label='Main Image'
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("img1")}
                    error={errors.img1 ? true : false}
                    onChange={(e) => {
                      onChangeMethod1(e);
                    }}
                  />
                  <Typography variant='inherit' color='textSecondary'>
                    {errors.img1?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    type='file'
                    id='img2'
                    name='img2'
                    label='Sub image'
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("img2")}
                    error={errors.img2 ? true : false}
                    onChange={(e) => {
                      onChangeMethod2(e);
                    }}
                  />
                  <Typography variant='inherit' color='textSecondary'>
                    {errors.img2?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    type='file'
                    id='img3'
                    name='img3'
                    label='Sub image'
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("img3")}
                    error={errors.img3 ? true : false}
                    onChange={(e) => {
                      onChangeMethod3(e);
                    }}
                  />
                  <Typography variant='inherit' color='textSecondary'>
                    {errors.img3?.message}
                  </Typography>
                </Grid>{" "}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    type='file'
                    id='img4'
                    name='img4'
                    label='Sub image'
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("img4")}
                    error={errors.img4 ? true : false}
                    onChange={(e) => {
                      onChangeMethod4(e);
                    }}
                  />
                  <Typography variant='inherit' color='textSecondary'>
                    {errors.img4?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    type='file'
                    id='img5'
                    name='img5'
                    label='Sub image'
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("img5")}
                    error={errors.img5 ? true : false}
                    onChange={(e) => {
                      onChangeMethod5(e);
                    }}
                  />
                  <Typography variant='inherit' color='textSecondary'>
                    {errors.img5?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='authorId'
                    name='authorId'
                    label='authorId'
                    value={authorId}
                    fullWidth
                    // style={{ display: "none" }}
                    {...register("authorId")}
                  />
                </Grid>
              </Grid>

              <Box color='secondary.main' mt={3}>
                {(props) => (
                  <>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      onClick={
                        editPostId
                          ? handleSubmit(onEdit)
                          : handleSubmit(onSubmit)
                      }
                    >
                      {editPostId ? "Update Post" : " Post Now "}
                    </Button>
                    {editPostId && (
                      <Button
                        variant='contained'
                        color='secondary'
                        sx={{ ms: 3 }}
                        onClick={() => {
                          setRefresh2(!refresh2);
                        }}
                      >
                        RESET
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Container>
        </Fragment>
      )}
      {!editPostId && <FooterComp />}
    </>
  );
};

export default Newpost;
