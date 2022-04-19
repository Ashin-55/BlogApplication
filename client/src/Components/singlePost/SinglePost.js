import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PostDetailsSkeloton from "../../skeleton/PostDetailsSkeloton";
import { useStyles } from "./styles.js";
import "./styles";

let userId;
let autherId;
let datas;
let path;
let path2;
const SinglePost = ({ author }) => {
  toast.configure();
  const classes = useStyles();
  const [postDetails, setPostDetails] = useState([]);
  const [favItem, setFavItem] = useState(false);
  const [likedItem, setLikedItem] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(true);
  let { id } = useParams();
  let authorInfo = localStorage.getItem("authorInfo")
  console.log(authorInfo)
  const config = {
    headers: {
      Authorization: `Bearer ${authorInfo}`,
    },
  };

  const wishlistHaandler = async (postId) => {
    const data = { postId, userId };
    if (userId) {
      const wishRes = await axios.post("/wishlist", data);
      if (wishRes.data.value == 1) {
        setFavItem(true);
      } else {
        setFavItem(false);
      }
      toast(`${wishRes.data.message}`, { type: "success" });
    } else {
      toast("Can't add !! login first", { type: "error" });
    }
  };

  const likeHandler = async (postId) => {
    let data;
    author ? (data = { postId, autherId }) : (data = { postId, userId });
    if (author) {
     
      if (autherId) {
        const likeAuth = await axios.post("/author/likePost", data,config);
        setFlag(!flag)
        toast(`${likeAuth.data.message}`, { type: "success", autoClose: 1000 });
      } else {
        toast("Can't add !! login first", { type: "error", autoClose: 1000 });
      }
    } else {
      if (userId) {

        // console.log(data,"kkkkkk")
        const likeUser = await axios.post("/likePost", data);
        console.log("likeuser output",likeUser)
        if (likeUser.data.value == 0) {
          setLikedItem(false);
        } else {
          setLikedItem(true);
        }
        setFlag(!flag)
        toast(`${likeUser.data.message}`, { type: "success", autoClose: 1000 });
      } else {
        toast("Can't add !! login first", { type: "error", autoClose: 1000 });
      }
    }
  };

  const fetchData = async (id) => {
    const postDetail = await axios.get(`/author/postDetail/${id}`,config);
    setPostDetails(postDetail.data.postDetails);
    setLoading(false);
  };
  const checkLikedPosts = async (path,datas) => {
    const likedPostorNot = await axios.post(path, datas,config);
    setLikedItem(likedPostorNot.data.postPresent);
  };
  const checkWishListPost = async(path2,datas)=>{
    const favrPostorNot = await axios.post(path2, datas);
    setFavItem(favrPostorNot.data.postPresent)
  }
  useEffect(() => {
    autherId = localStorage.getItem("authorId");
    userId = localStorage.getItem("userId");
    fetchData(id);
    if (author) {
      datas = { id, autherId };
      path = "/author/checkPostLiked";
      checkLikedPosts(path,datas)
    } else {
      if (userId) {
        datas = { id, userId };
        path = "/checkPostLikedorNot";
        path2 ="/chechPostfavrite"
        checkLikedPosts(path,datas)
        checkWishListPost(path2,datas)
      } else {
        console.log("user not Present");
      }
    }
  }, [flag]);
  return (
    <>
      {Loading && (
        <Container maxWidth='lg'>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ padding: "5% 0 5% 0" }}>
              <PostDetailsSkeloton />
            </Grid>
          </Grid>
        </Container>
      )}
      {postDetails.map((post, index) => {
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
            <div xs={12} lg={9}>
              <Typography
                className={classes.authDetails}
                sx={{
                  fontSize: 15,
                  fontFamily: "Poppins",
                  fontWeight: "lighter",
                }}
              >
                BY{" "}
                <b>
                  <Link
                    to={`/authorDetails/${post.autherData._id}`}
                    style={{ color: "black" }}
                  >
                    {post.autherData.firstName} {post.autherData.lastName}
                  </Link>
                </b>{" "}
                / {post.place} /{moment(post.date).format("LL")}
              </Typography>

              <Typography
                className={classes.mainTitle}
                sx={{
                  fontSize: "2rem",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  backgroundColor: "white",
                  padding: "3%",
                  borderRadius: 5,
                  marginTop:"2%"
                }}
              >
                {post.postTitle}
              </Typography>
              <Typography
                className={classes.likeComments}
                sx={{
                  fontSize: 15,
                  fontFamily: "Poppins",
                  fontWeight: "initial",
                  padding: "3% 0 1% 0",
                }}
              >
                Liked the post? Please show some sharing love.
              </Typography>
              <div>
                {author ? null : (
                  <IconButton
                    aria-label='add to favorites'
                    sx={{ margin: "0 3% 0 0 " }}
                    onClick={() => {
                      wishlistHaandler(post._id);
                      setFlag(!flag);
                    }}
                  >
                    <FavoriteIcon sx={{ color: favItem ? "red" : null }} />
                  </IconButton>
                )}
                <IconButton
                  aria-label='like'
                  onClick={() => {
                    likeHandler(post._id);
                    // setFlag(!flag);
                  }}
                >
                  <ThumbUpIcon sx={{ color: likedItem ? "blue" : null }} />
                  <div>
                    {"\u00A0"} {post.likeCount} likes
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
                      image={post.image1}
                      className={classes.images}
                      sx={{ width: "70%" }}
                    />
                  </Grid>
                  <CardContent sx={{}}>
                    <Typography
                      className={classes.subtitle}
                      sx={{
                        fontSize: 30,
                        fontFamily: "Poppins",
                        fontWeight: "bolder",
                        textAlign: "center",
                        padding: "3% 0 5% 0",
                      }}
                    >
                      {post.subTitle}
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
                      {post.postContent}
                    </Typography>
                  </CardContent>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      fontWeight: "bolder",
                      textAlign: "center",
                      padding: "5% 0 2% 0",
                    }}
                  >
                    More Images
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
                        alt='post2'
                        image={post.image2}
                        className={classes.subimages}
                        sx={{ width: "80%" }}
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
                        alt='post3'
                        image={post.image3}
                        className={classes.subimages}
                        sx={{ width: "80%", height: "95%" }}
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
                        alt='post4'
                        image={post.image4}
                        className={classes.subimages}
                        sx={{ width: "80%", height: "90%" }}
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
                        alt='post5'
                        image={post.image5}
                        className={classes.subimages}
                        sx={{ width: "80%", height: "90%" }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </div>
          </Container>
        );
      })}
    </>
  );
};

export default SinglePost;
