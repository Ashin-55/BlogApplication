import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { blue, pink } from "@mui/material/colors";

import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useStyles } from "./style";
import axios from "axios";
import moment from "moment";
const ViewAuthorPostComp = () => {
  toast.configure();
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const adminInfo = localStorage.getItem("adminInfo");

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };

  const [authorPostData, setAuthorPostData] = useState([]);
  const [authorPostDataContent, setAuthorPostDataContent] = useState("");
  const [authorData, setAuthorData] = useState({});
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [refresh, setRefresh] = useState("paper");

  const handleClickOpen = (scrollType, data) => () => {
    setAuthorPostDataContent(data);
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deletePostHandler = async (id) => {
    confirmAlert({
      title: "CONFIRM",
      message: "Are you sure to delete this post",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`/admin/postDelete/${id}`, config)
              .then((response) => {
                setRefresh(!refresh);
                toast(`${response.data.message}`, {
                  type: "success",
                  autoClose: 1000,
                });
              })
              .catch((error) => {
                toast(`failed to delete`, { type: "error", autoClose: 1000 });
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            toast("saved", {
              type: "success",
              autoClose: 1000,
            });
          },
        },
      ],
    });
  };

  const descriptionElementRef = React.useRef(null);
  const fetchAutherPostData = async (id) => {
    const { data } = await axios.get(
      `/admin/getAuthorPostDetails/${id}`,
      config
    );
    setAuthorPostData(data.message);
  };
  const fetchAutherDetails = async (id) => {
    const { data } = await axios.get(`/admin/getAuthorData/${id}`, config);
    setAuthorData(data);
  };
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  useEffect(() => {
    !adminInfo && navigate("/admin/login");
    adminInfo && fetchAutherPostData(id);
    adminInfo && fetchAutherDetails(id);
  }, [refresh]);

  return (
    <>
      <Container
        sx={{
          minHeight: 500,
          backgroundColor: "whitesmoke",
          marginBottom: "5%",
          borderRadius: 5,
          padding: "4% 5%",
        }}
      >
        <Grid
          align='center'
          sx={{
            padding: "1%",
            fontWeight: "bold",
            fontFamily: "Poppins",
            fontSize: 25,
            backgroundColor: "white",
            borderRadius: 5,
            marginBottom: "3%",
          }}
        >
          Author Details
        </Grid>
        <Grid
          container
          spacing={1}
          sx={{
            backgroundColor: "white",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Grid item xs={12} md={4} sx={{ marginTop: "2%" }}>
            <div>
              <b> Name of author: </b>
              {authorData.firstName} {authorData.lastName}
            </div>
            <div>
              <b> Email of author: </b>
              {authorData.email}
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography
              align='center'
              sx={{ fontWeight: "bold", fontFamily: "Poppins", fontSize: 15 }}
            >
              POSTS
            </Typography>
            <Grid container sx={{ padding: "2%" }} spacing={0.2}>
              {authorPostData.map((detail, index) => (
                <Grid
                  item
                  xs={12}
                  md={4}
                  className={classes.outerGrid}
                  key={index}
                >
                  <Card
                    variant='outlined'
                    sx={{
                      padding: "5% 5% 9% 5%",
                      minWidth: "60%",
                      maxWidth: "60%",
                      minHeight: "80",
                      maxHeight: "80%",
                      boxShadow: 2,
                      "&:hover": {
                        boxShadow: 5,
                      },
                      borderRadius: 5,
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
                        className={classes.images}
                        component='img'
                        alt='post'
                        image={detail.image1}
                        sx={{ width: "100%", height: "auto" }}
                      />
                    </Grid>

                    <Typography sx={{ fontWeight: "light" }}>
                      {moment(detail.date).format("L")}
                    </Typography>

                    <Typography
                      className={classes.title}
                      sx={{ fontWeight: "bold" }}
                    >
                      {detail.postTitle.substring(0, 40)}...
                    </Typography>
                    <CardActions>
                      <Button
                        onClick={handleClickOpen("paper", detail.postContent)}
                      >
                        View
                      </Button>
                      <IconButton
                        onClick={() => {
                          deletePostHandler(detail._id);
                        }}
                      >
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}

              <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
              >
                <DialogTitle id='scroll-dialog-title'>Post Content</DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                  <DialogContentText
                    id='scroll-dialog-description'
                    ref={descriptionElementRef}
                    tabIndex={-1}
                  >
                    {authorPostDataContent}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ViewAuthorPostComp;
