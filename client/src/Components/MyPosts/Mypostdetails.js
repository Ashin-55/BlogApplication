import {
  Container,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import PostDetailsSkeloton from "../../skeleton/PostDetailsSkeloton";
import { useStyles } from "./styles";
import Newpost from "../../Screens/CreatePost/Newpost";
import "./styles.css";

const Mypostdetails = () => {
  toast.configure();
  const classes = useStyles();
  const navigate = useNavigate();
  const [postDetail, setPostDetails] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [editpostid, setEditpostid] = useState(true);
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const { id } = useParams();
  const authorInfo = localStorage.getItem("authorInfo");

  const config = {
    headers: {
      Authorization: `Bearer ${authorInfo}`,
    },
  };
  const deletePost = async (id) => {
    confirmAlert({
      title: "Are you sure to delete this post",
      message: "Once deleted can't restore",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const data = await axios.get(`/author/deletePost/${id}`, config);
            toast(`${data.data.message}`, { type: "success", autoClose: 1000 });
            navigate("/author/mypost");
          },
        },
        {
          label: "No",
          onClick: () => {
            toast("Post Saved successfully", {
              type: "success",
              autoClose: 1000,
            });
          },
        },
      ],
    });
  };
  const editPost = async (POSTID) => {
    setEditpostid(POSTID);
    setEdit(true);
  };

  const fetchdata = async () => {
    const detailData = await axios.get(`/author/mypostDetail/${id}`, config);
    setPostDetails(detailData.data.mypostDetails);
    setLoading(false);
  };

  useEffect(() => {
    fetchdata();
  }, [refresh]);
  return (
    <>
      {Loading && (
        <Container maxWidth='md'>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ padding: "5% 0 5% 0" }}>
              <PostDetailsSkeloton />
            </Grid>
          </Grid>
        </Container>
      )}
      {edit ? (
        <Newpost
          editpostid={editpostid}
          setRefresh={setRefresh}
          refresh={refresh}
          setEdit={setEdit}
        />
      ) : (
        postDetail.map((postData, index) => {
          return (
            <Container
              maxWidth='lg'
              sx={{
                boxShadow: 3,
                borderRadius: 5,
                padding: "2% 1% 2% 1%",
                backgroundColor: "whitesmoke",
              }}
              key={index}
            >
              <Typography
                sx={{
                  fontSize: 15,
                  fontFamily: "Poppins",
                  fontWeight: "lighter",
                }}
              >
                <b> posted on:</b> {moment(postData.createdAt).format("LL")}
                {"\u00A0"} {"\u00A0"} <b> Trip date:</b>{" "}
                {moment(postData.date).format("LL")}
              </Typography>
              <Typography
                sx={{
                  // fontSize: 40,
                  // fontFamily: "Poppins",
                  // fontWeight: "bold",
                  fontSize: "2rem",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  backgroundColor: "white",
                  padding: "3%",
                  borderRadius: 5,
                }}
              >
                {postData.postTitle}
              </Typography>
              <div className={classes.buttonDiv}>
                <IconButton aria-label='like'>
                  <ThumbUpIcon style={{ color: "blue" }} />
                  <div style={{ fontSize: "small", color: "blue" }}>
                    {"\u00A0"} {postData.likeCount} Likes{" "}
                  </div>
                </IconButton>
                <IconButton
                  aria-label='delete'
                  onClick={() => {
                    deletePost(postData._id);
                  }}
                >
                  <DeleteForeverIcon style={{ color: "red" }} />
                  <div style={{ fontSize: "small", color: "red" }}>
                    Delete post
                  </div>
                </IconButton>
                <IconButton
                  aria-label='edit'
                  onClick={() => {
                    editPost(postData._id);
                  }}
                >
                  <EditIcon style={{ color: "green" }} />
                  <div style={{ fontSize: "small ", color: "green" }}>
                    Edit post
                  </div>
                </IconButton>
              </div>
              <Grid>
                <Card
                  className={classes.card}
                  sx={{
                    border: "none",
                    boxShadow: "none",
                    height: "auto",
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
                    <CardMedia
                      component='img'
                      alt='post1'
                      image={postData.image1}
                      className={classes.images}
                      sx={{ width: "70%" }}
                    />
                  </Grid>
                  <CardContent>
                    <Typography
                      sx={{
                        fontSize: 30,
                        fontFamily: "Poppins",
                        fontWeight: "bolder",
                        textAlign: "center",
                        padding: "3% 0 5% 0",
                      }}
                    >
                      {postData.subTitle}
                    </Typography>
                    <Typography
                      className='postContent'
                      sx={{
                        letterSpacing: "-0.03em",
                        lineHeight: "38px",
                        marginTop: "2em",
                        fontStyle: "poppins",
                        wordBreak: "break-word",
                        color: "black",
                        fontWeight: 400,
                        display: "block",
                        marginBlockStart: "1em",
                        marginBlockEnd: "1em",
                        marginInlineStart: "0px",
                        marginInlineEnd: "0px",
                        fontSize: "20px",
                        backgroundColor: "white",
                        borderRadius: 5,
                        padding: "5%",
                      }}
                    >
                      {postData.postContent}
                    </Typography>
                  </CardContent>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      fontWeight: "bolder",
                      padding: "5% 0 2% 0",
                      textAlign: "center",
                    }}
                  >
                    Added Images
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        component='img'
                        alt='post1'
                        image={postData.image2}
                        className={classes.images}
                        sx={{ maxWidth: "70%", minWidth: "70%" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        component='img'
                        alt='post1'
                        image={postData.image3}
                        className={classes.images}
                        sx={{ maxWidth: "70%", minWidth: "70%" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        component='img'
                        alt='post1'
                        image={postData.image4}
                        className={classes.images}
                        sx={{ maxWidth: "70%", minWidth: "70%" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        component='img'
                        alt='post1'
                        image={postData.image5}
                        className={classes.images}
                        sx={{ maxWidth: "70%", minWidth: "70%" }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Container>
          );
        })
      )}
    </>
  );
};

export default Mypostdetails;
