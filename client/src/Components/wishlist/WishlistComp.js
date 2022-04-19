import axios from "axios";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  IconButton,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Skeloton from "../../skeleton/Skeloton";
import EmptyAnimation from "../animaton/EmptyAnimation";

export default function WishlistComp({ author }) {
  toast.configure();
  const navigate = useNavigate();
  const [flag, setFlag] = React.useState(true);
  const [favPost, setFavpost] = React.useState([]);
  const [Loading, setLoading] = React.useState(true);
  const userId = localStorage.getItem("userId");

  const postDetailHandler = (id) => {
    author
      ? navigate(`/author/postDetail/${id}`)
      : navigate(`/postDetail/${id}`);
  };
  const wishlistHaandler = async (postId) => {
    const data = { postId, userId };
    const wishRes = await axios.post("/wishlist", data);
    console.log(wishRes);

    toast(`${wishRes.data.message}`, { type: "success", autoClose: 1000 });
    setFlag(!flag);
  };
  React.useEffect(() => {
    (async (id) => {
      const data = await axios.get(`/getWishlist/${id}`);
      setFavpost(data.data.message);
      setLoading(false);
    })(userId);
  }, [flag]);
  return (
    <Container maxWidth='md'>
      <Typography sx={{ fontSize: 25, fontFamily: "Poppins" }}>
        Favorite posts : {favPost.length}
      </Typography>
      <hr />

      {Loading ? (
        <Grid container sx={{ marginY: "3%" }} spacing={2}>
          <Grid item xs={12} md={6}>
            <Skeloton fav={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeloton fav={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeloton fav={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeloton fav={true} />
          </Grid>
        </Grid>
      ) : (
        <Grid container sx={{ marginY: "3%", minHeight: "50vh" }} spacing={2}>
          <Grid item xs={12}>
            {favPost.length === 0 && (
              <>
                <Typography align='center'>
                  You dont have any Favorite Post
                  <Link style={{ textDecoration: "none" }} to='/'>
                    {"  "}SEE POSTS
                  </Link>
                </Typography>
                <EmptyAnimation />
              </>
            )}
          </Grid>
          {favPost.map((details, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ maxWidth: 345, borderRadius: "5%", boxShadow: 5 }}>
                <CardActionArea
                  sx={{ padding: "3%" }}
                  onClick={() => {
                    postDetailHandler(details._id);
                  }}
                >
                  <CardMedia
                    component='img'
                    height='140'
                    image={details.image1}
                    alt='green iguana'
                    sx={{ borderRadius: "5%" }}
                  />
                  <CardContent>
                    <CardHeader
                      sx={{ padding: 0 }}
                      avatar={
                        <Avatar
                          aria-label='recipe'
                          sx={{
                            height: "30px",
                            width: "30px",
                            bgcolor: red[500],
                          }}
                        >
                          {details.postTitle.substring(0, 1)}
                        </Avatar>
                      }
                      titleTypographyProps={{ variant: "inherit" }}
                      title={details.postTitle}
                    />
                  </CardContent>
                </CardActionArea>
                <Typography align='right' padding={" 0 2%"}>
                  <IconButton
                    aria-label='add to favorites'
                    onClick={() => {
                      wishlistHaandler(details._id);
                    }}
                  >
                    <FavoriteIcon style={{ color: "red" }} />
                  </IconButton>
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
