import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Slide,
  Backdrop,
  CircularProgress
} from "@mui/material";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";
import { pink, blue } from "@mui/material/colors";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import { useStyles } from "./style";
import AuthorDetailsSkeloton from "../../skeleton/AuthorDetailsSkeloton";
import PostDetailsSkeloton from "../../skeleton/PostDetailsSkeloton";
import { ChatState } from "../../Context/ChatProvider";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

let user;
const AuthorDetailsComp = ({ author }) => {
  const { chats, setChats, setSelectedChat } = ChatState();
  const navigate = useNavigate();

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [authProfile, setAuthProfile] = useState([]);
  const [postData, setPostData] = useState([]);
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const { id } = useParams();
  const postDetailHandler = (ID) => {
    author
      ? navigate(`/author/postDetail/${ID}`)
      : navigate(`/postDetail/${ID}`);
  };

  const msgAuthorHandler = async (userId) => {
  
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const checkUserPremium = await axios.get(`/checkUserPremium/${user._id}`);
     
      if (checkUserPremium.data.message.premiumUser) {
        setBackdrop(true)
        const { data } = await axios.post("/api/chat", { userId }, config);
        setBackdrop(false)
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
        setSelectedChat(data);
        navigate("/chat");
      } else {
        setOpen(true);
      }
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickPremium = ()=>{
    navigate("/premium")
  }
  useEffect(() => {
    user = JSON.parse(localStorage.getItem("userInfo2"));
    const fetchData = async (authorid) => {
      const data = await axios.get(`/author/authordetails/${authorid}`);
      setAuthProfile(data.data.authData);
      setPostData(data.data.postData);
      setLoading(false);
    };
    fetchData(id);
  }, []);
  return (
    <Container sx={{ boxShadow: 5, borderRadius: "3%" }} maxWidth='lg'>
      {loading ? (
        <Grid container spacing={1}>
          <Grid item xs={12} md={4} sx={{ marginTop: "5%" }}>
            <AuthorDetailsSkeloton />
          </Grid>
          <Grid item xs={12} md={8} sx={{ paddingLeft: "2%" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} sx={{ padding: "5% 0 5% 0" }}>
                <PostDetailsSkeloton />
              </Grid>
              <Grid item xs={12} md={6} sx={{ padding: "5% 0 5% 0" }}>
                <PostDetailsSkeloton />
              </Grid>
              <Grid item xs={12} md={6} sx={{ padding: "5% 0 5% 0" }}>
                <PostDetailsSkeloton />
              </Grid>
              <Grid item xs={12} md={6} sx={{ padding: "5% 0 5% 0" }}>
                <PostDetailsSkeloton />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <>
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdrop}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
          <Grid
            align='center'
            sx={{
              padding: "1%",
              fontWeight: "bold",
              fontFamily: "Poppins",
              fontSize: 25,
            }}
          >
            More about {authProfile[0].firstName} {authProfile[0].lastName}
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4} sx={{ marginTop: "5%" }}>
              <Card
                variant='outlined'
                sx={{
                  minHeight: "25%",

                  maxWidth: 345,
                  boxShadow: 1,
                  borderRadius: 1,
                  backgroundColor: blue[50],
                }}
                className={classes.posts}
              >
                <div className={classes.outerGrid}>
                  <CardMedia
                    className={classes.images}
                    component='img'
                    alt='profile pic'
                    sx={{ maxWidth: "70%", paddingTop: "10%" }}
                    image='../../images/profile3.png'
                  />
                </div>
                <Grid container>
                  <Grid item xs={8} className={classes.outerGrid}>
                    <div>
                      <Typography align='center'>
                        {authProfile[0].firstName} {authProfile[0].lastName}
                      </Typography>
                      <Typography fontSize={12} align='center'>
                        {authProfile[0].email}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <CardActions>
                      {user && (
                        <IconButton
                          onClick={() => msgAuthorHandler(authProfile[0]._id)}
                        >
                          <ForumTwoToneIcon
                            sx={{ paddingTop: "50%", color: blue[200] }}
                          />
                        </IconButton>
                      )}
                    </CardActions>
                  </Grid>
                </Grid>
                <CardContent align='center'>
                  {authProfile[0].indroduction}
                </CardContent>
                <div className={classes.outerGrid}>
                  <CardActions>
                    <IconButton>
                      <FacebookTwoToneIcon sx={{ color: blue[700] }} />
                    </IconButton>
                    <IconButton>
                      <InstagramIcon sx={{ color: pink[800] }} />
                    </IconButton>
                    <IconButton>
                      <LinkedInIcon sx={{ color: blue[700] }} />
                    </IconButton>
                  </CardActions>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} md={8} sx={{}}>
              <Typography
                align='center'
                sx={{ fontWeight: "bold", fontFamily: "Poppins", fontSize: 15 }}
              >
                POSTS
              </Typography>{" "}
              <Grid container sx={{ padding: "2%" }} spacing={2}>
                {postData.map((details, index) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card
                      variant='outlined'
                      sx={{
                        padding: "5%",
                        minHeight: "85%",
                        maxHeight: "95%",
                        maxWidth: "70%",
                        minWidth: "70%",
                        boxShadow: 3,
                        borderRadius: 5,
                      }}
                    >
                      <CardMedia
                        className={classes.images}
                        component='img'
                        height='194'
                        alt='post'
                        image={details.image1}
                      />

                      <Typography sx={{ fontWeight: "light" }}>
                        {details.place}/{moment(details.date).format("LL")}
                      </Typography>

                      <Typography
                        className={classes.title}
                        sx={{ fontWeight: "bold" }}
                      >
                        {details.postTitle.substring(0, 50)}...
                      </Typography>
                      <Typography className={classes.subtitle}>
                        {details.postIndroduction.substring(0, 80)}...
                      </Typography>
                      <Button
                        onClick={() => {
                          postDetailHandler(details._id);
                        }}
                      >
                        {" "}
                        Reed More
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          {/* premium user alert  */}
          <Dialog
            transitionDuration={{ enter: 1000, exit: 0 }}
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            TransitionComponent={Transition}
          >
            <DialogTitle align='center'>
              <StarsSharpIcon style={{ color: "gold" }} sx={{ fontSize: 80 }} />
            </DialogTitle>
            <DialogTitle id='alert-dialog-title' align='center'>
              {"GET PREMIUM MEMBERSHIP"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Get Premium membership to chat with your favorites Authers and
                get this benifit Life long
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={handleClickPremium}
                autoFocus
                variant='contained'
                style={{ backgroundColor: "gold", color: "black" }}
              >
                Get premium
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default AuthorDetailsComp;
