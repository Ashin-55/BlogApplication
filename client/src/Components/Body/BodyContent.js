import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import moment from "moment";

import { useStyles } from "./styles";
import Skeloton from "../../skeleton/Skeloton";

const BodyContent = ({ author }) => {
  toast.configure();
  const classes = useStyles();
  const [allPost, setAllPost] = useState([]);
  const [allPopularPost, setAllPopularPost] = useState([]);
  const [allPopularAuthors, setAllPopularAuthors] = useState([]);
  const [favPostId, setFavPostId] = useState([]);
  const [likedPostId, setLikedPostId] = useState([]);
  const [likedPostIdAuth, setLikedPostIdAuth] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(true);

  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo");
  const userId = localStorage.getItem("userId");
  const autherId = localStorage.getItem("authorId");
  const authorIfo = localStorage.getItem("authorInfo");

  const config = {
    headers: {
      Authorization: `Bearer ${authorIfo}`,
    },
  };

  const login = () => {
    navigate("/login");
  };
  const postDetailHandler = (id) => {
    author
      ? navigate(`/author/postDetail/${id}`)
      : navigate(`/postDetail/${id}`);
  };

  const wishlistHaandler = async (postId) => {
    const data = { postId, userId };
    const indexx = favPostId.indexOf(postId);
    if (userId) {
      const wishRes = await axios.post("/wishlist", data);
      console.log(favPostId);
      if (wishRes.data.value == 1) {
        toast(`${wishRes.data.message}`, { type: "success", autoClose: 1000 });
        favPostId.push(postId);
      } else {
        toast(`${wishRes.data.message}`, { type: "success", autoClose: 1000 });
        favPostId.splice(indexx, 1);
      }
    } else {
      toast("Can't add !! login first", { type: "error", autoClose: 1000 });
    }
  };

  const likeHandler = async (postId, ownerID) => {
    let data;
    const indexx = likedPostId.indexOf(postId);
    const index2 = likedPostIdAuth.indexOf(postId);
    author
      ? (data = { postId, autherId, ownerID })
      : (data = { postId, userId, ownerID });
    if (author) {
      if (autherId) {
        const likeAuth = await axios.post("/author/likePost", data, config);
        if (likeAuth.data.value == 1) {
          likedPostIdAuth.push(postId);
        } else {
          likedPostIdAuth.splice(index2, 1);
        }
        setFlag(!flag);
        toast(`${likeAuth.data.message}`, { type: "success", autoClose: 1000 });
      } else {
        toast("Can't add !! login first", { type: "error", autoClose: 1000 });
      }
    } else {
      if (userId) {
        const likeUser = await axios.post("/likePost", data);
        if (likeUser.data.value == 1) {
          likedPostId.push(postId);
        } else {
          likedPostId.splice(indexx, 1);
        }
        setFlag(!flag);
        toast(`${likeUser.data.message}`, { type: "success", autoClose: 1000 });
      } else {
        toast("Can't add !! login first", { type: "error", autoClose: 1000 });
      }
    }
  };
  const fetchPopularData = async () => {
    let getData2 = [];
    let getData3 = [];
    try {
      getData2 = await axios.get("/popularPost");
      getData3 = await axios.get("/activeAuthors");
      setAllPopularPost(getData2.data.allPost);
      console.log(getData3);
      setAllPopularAuthors(getData3.data.message);
    } catch (error) {
      console.log("erro for fetching the popular data is :", error);
    }
  };
  useEffect(() => {
    console.log("fetch data called ");
    const fetchData = async () => {
      let getData = [];
      try {
        author
          ? (getData = await axios.get(`/author/home/${autherId}`, config))
          : (getData = await axios.get("/home"));

        setAllPost(getData.data.allPost);
        setLoading(false);
      } catch (error) {
        console.log("Error camed", error);
      }
    };
    fetchData();
    fetchPopularData();
  }, [flag]);
  //wishlist useEffect
  useEffect(() => {
    if (userId) {
      (async (id) => {
        const items = await axios.get(`/getWishlist/${id}`);
        const likedId = await axios.get(`/getLikedList/${id}`);
        setLikedPostId(likedId.data.likedListIDS);
        setFavPostId(items.data.wishlistIdS);
      })(userId);
    }
    if (author) {
      let AUTHORID = autherId
        ? autherId
        : JSON.parse(localStorage.getItem("authorInfo2"))._id;
      (async (id) => {
        const likedId = await axios.get(`/author/getLikedList/${id}`, config);
        setLikedPostIdAuth(likedId.data.likedListIDS);
      })(AUTHORID);
    }
  }, []);

  return (
    <>
      {Loading && (
        <>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
        </>
      )}
      <Grid
        item
        xs={9}
        container
        spacing={2}
        sx={{ backgroundColor: "whitesmoke", marginBottom: "3%" }}
      >
        {allPost.map((post, index) => {
          return (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              className={classes.outerGrid}
              key={index}
              sx={{ minHeight: "20%" }}
            >
              <Card
                variant='outlined'
                sx={{
                  minHeight: "70%",
                  maxHeight: "85%",
                  maxWidth: "78%",
                  minWidth: "78%",
                  boxShadow: 1,
                  "&:hover": {
                    boxShadow: 6,
                  },
                  borderRadius: 5,
                }}
                className={classes.posts}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                      {post.authorId.firstName.substring(0, 1)}
                    </Avatar>
                  }
                  title={`${post.authorId.firstName}  ${post.authorId.lastName}`}
                  subheader={moment(post.createdAt).fromNow()}
                />
                <CardMedia
                  className={classes.images}
                  component='img'
                  height='200px'
                  alt='post1'
                  image={post.image1}
                />
                <CardContent>
                  <Typography
                    className={classes.title}
                    sx={{ fontWeight: "bold" }}
                  >
                    {post.postTitle.substring(0, 54)}..
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    sx={{ fontWeight: "light" }}
                  >
                    {/* {favPostId.indexOf(post._id)} */}
                    {post.postIndroduction.substring(0, 80)}...
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "flex-end",
                  }}
                >
                  <Grid>
                    <Button
                      onClick={() => {
                        postDetailHandler(post._id);
                      }}
                    >
                      Read More....
                    </Button>
                  </Grid>
                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    {author ? null : (
                      <IconButton
                        // sx={{ marginLeft: "auto", marginRight: "2%" }}
                        aria-label='add to favorites'
                        onClick={() => {
                          wishlistHaandler(post._id);
                          setFlag(!flag);
                        }}
                      >
                        <FavoriteIcon
                          style={
                            favPostId.indexOf(post._id) >= 0
                              ? { color: "red" }
                              : { color: "GrayText " }
                          }
                        />
                      </IconButton>
                    )}
                    <IconButton
                      sx={{ marginRight: "5%" }}
                      aria-label='like'
                      onClick={() => {
                        likeHandler(post._id, post.authorId);
                        // setFlag(!flag);
                      }}
                    >
                      {author ? (
                        <ThumbUpIcon
                          style={
                            likedPostIdAuth.indexOf(post._id) >= 0
                              ? { color: "blue" }
                              : { color: null }
                          }
                        />
                      ) : (
                        <ThumbUpIcon
                          style={
                            likedPostId.indexOf(post._id) >= 0
                              ? { color: "blue" }
                              : { color: null }
                          }
                        />
                      )}
                    </IconButton>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Grid
        item
        container
        spacing={2}
        sm={3}
        sx={{
          display: { xs: "none", md: "flex" },
          backgroundColor: "whitesmoke",
          // marginBottom: "3%",
        }}
      >
        <Grid item xs={12}>
          {!userId && !author ? (
            <Box
              sx={{
                borderRadius: 3,
                padding: "2%",
                marginRight: "4%",
                marginBottom: "4%",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "15vh",
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: "25px" }}>
                Login To Get Full Access
              </Typography>
              <Button onClick={login}>Login</Button>
            </Box>
          ) : null}
          <Box
            sx={{
              borderRadius: 3,
              padding: "2% 3% 8% 3%",
              marginRight: "4%",
              marginBottom: "4%",
              backgroundColor: "white",
            }}
          >
            <Typography
              align='center'
              sx={{ padding: "5%", fontSize: "25px", fontWeight: 600 }}
            >
              POPULAR POSTS
            </Typography>
            {allPopularPost.map((post, index) => {
              return (
                <Box
                  key={post._id}
                  onClick={() => postDetailHandler(post._id)}
                  sx={{
                    border: "2px solid",
                    borderColor: "gray",
                    borderRadius: 5,
                    padding: "2%",
                    marginY: "2%",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <img
                        src={post.image1}
                        alt='images'
                        className={classes.Smallimages}
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
                        {post.postTitle.substring(0, 35)}..
                      </Typography>
                      <Typography fontSize={"15px"}>
                        {" "}
                        {post.likeCount} likes
                      </Typography>
                      <Typography fontSize={"15px"}>
                        By {post.authorId.firstName} {post.authorId.lastName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              borderRadius: 3,
              padding: "2% 3% 8% 3%",
              marginRight: "4%",
              marginBottom: "4%",
              backgroundColor: "white",
            }}
          >
            <Typography
              align='center'
              sx={{ padding: "5%", fontSize: "25px", fontWeight: 600 }}
            >
              ACTIVE AUTHORS
            </Typography>
            {allPopularAuthors.map((post, index) => {
              return (   
                <Box
                  key={post.authorData._id}
                  sx={{
                    border: "2px solid",
                    borderColor: "gray",
                    borderRadius: 5,
                    padding: "2%",
                    marginY: "2%",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  {console.log("the data isssss", post)}
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <img
                        src='../../images/profile3.png'
                        alt='images'
                        className={classes.profileimages}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Link
                        to={`/authorDetails/${post.authorData._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "15px",
                            color: "black",
                          }}
                        >
                          {post.authorData.firstName}
                        </Typography>
                      </Link>
                      <Typography fontSize={"15px"}>
                        {" "}
                        {post.count} Post
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default BodyContent;
