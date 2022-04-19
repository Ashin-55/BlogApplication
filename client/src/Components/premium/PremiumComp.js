import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import axios from "axios";
import Stripe from "react-stripe-checkout";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostDetailsSkeloton from "../../skeleton/PostDetailsSkeloton";

const publishKey =
  "pk_test_51Kfq3zGKmK7usWqzs5r2or3XrqZ7NJHwf7HpRgfUusOjkSH2OizmtVscgDEtCaOAtBsgywymETnHokJ7OMdhxPjl00CdFD6MN3";

const PremiumComp = () => {
  toast.configure();
  const userId = localStorage.getItem("userId");
  const classes = useStyles();
  const [responsePremium, setResponsePremium] = useState(false);
  const [paymentButton, setPaymentButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [premium] = useState({
    name: "Premium mebership",
    price: 4000,
    description: "Buy membership",
  });
  const handleToken = async (token, addresses) => {
    setLoading(true)
    try {
      const response = await axios.post("/premium", {
        token,
        premium,
        userId,
      });
      if (response.data.status == "success") {
        toast("Success! Check email for details", { type: "success",autoClose: 2000,  });
        setResponsePremium(true);
        setLoading(false)
      } else {
        setLoading(false)
        toast("Something went wrong", { type: "error" });
      }
    } catch (error) {
      console.log("in error case");
      console.log(error);
    }
  };
  const enableButtonHandler = () => {
    setPaymentButton(true);
  };

  useEffect(() => {
    const fetchData = async (userid) => {
      const response = await axios.get(`/checkUserPremium/${userid}`);
      setResponsePremium(response.data.message.premiumUser);
      setLoading(false)
    };
    fetchData(userId);
  }, []);

  return (
    <>
      {loading ? (
        <Grid container spacing={1} className={classes.outerGrid}>
          <Grid item xs={12} md={4}  >
            <PostDetailsSkeloton />
          </Grid>
        </Grid>
      ) : (
        <Grid container sx={{ paddingBottom: "5%" }}>
           <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
          <Grid className={classes.outerGrid} item xs={12}>
            <Card
              className={classes.Card}
              align='center'
              sx={{
                minWidth: "20%",
                padding: "1%",
                boxShadow: 5,
                borderRadius: "5%",
                backgroundColor: "#f5ecd3",
              }}
            >
              <CardHeader
                title={responsePremium ? "Enabled" : "Get your Premium"}
                sx={{ fontFamily: "bold", color: "#cc960e" }}
                align='center'
              />
              <CardMedia
                component='img'
                alt='post1'
                image='../../images/premiumLogo.png'
                sx={{ width: "52%" }}
              />
              <CardContent
                sx={{
                  backgroundColor: "#ffffff",
                  marginTop: "4%",
                  borderRadius: "10%",
                  maxWidth: "70%",
                  fontFamily: "bold",
                }}
              >
                <Typography>Life time MemberShip</Typography>
                <Typography>Chat with Favorite authors</Typography>
              </CardContent>
              <hr />
              {responsePremium ? (
                <CardContent sx={{ fontSize: 30, color: "#cc960e" }}>
                  {" "}
                  You have lifeLong Premium MemberShip
                </CardContent>
              ) : (
                <>
                  <CardContent sx={{ fontSize: 30, color: "#cc960e" }}>
                    {" "}
                    INR 399
                  </CardContent>
                  <CardActions className={classes.outerGrid}>
                    {!paymentButton ? (
                      <Button
                        variant='outlined'
                        color='warning'
                        onClick={enableButtonHandler}
                      >
                        Enable
                      </Button>
                    ) : (
                      <Stripe
                        stripeKey={publishKey}
                        token={handleToken}
                        amount={premium.price}
                        name={premium.name}
                        billingAddress
                        shippingAddress
                      />
                    )}
                  </CardActions>
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PremiumComp;
