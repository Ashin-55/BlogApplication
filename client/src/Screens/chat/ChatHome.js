import {
  Box,
  Container,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Slide,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ChatState } from "../../Context/ChatProvider";
import ChatBox from "../../Components/CHAT/ChatBox";
import Header from "../../Components/navbar/Header";
import SideDrawer from "../../Components/CHAT/SideDrawer";
import AuthHeader from "../../Components/navbar/AuthHeader";
import MyChat from "../../Components/CHAT/MyChat";
import FooterComp from "../../Components/Footer/FooterComp";
import GraphSkell from "../../skeleton/GraphSkell";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const ChatHome = ({ author }) => {
  const { user } = ChatState();
  const navigate = useNavigate();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [loading, setLoading] = useState(true);
  const [premiumUser, setPremiumUser] = useState(false);
  const [open, setOpen] = useState(true);
  const [backdrop, setBackdrop] = useState(false);


  const checkPremiumUser = async (userID) => {
    setLoading(true)
    const { data } = await axios.get(`/checkUserPremium/${userID}`);
    setPremiumUser(data.message.premiumUser);
    setLoading(false)
  };
  useEffect(() => {
    if(author){
      setLoading(false)
    }
    if (!author) {
      let USERID = user ? user._id : localStorage.getItem("userId");
      checkPremiumUser(USERID);
    }
  
  }, []);

  const handleClickPremium = () => {
    navigate("/premium");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!author ? <Header /> : <AuthHeader />}

      <Container style={{ width: "100%", minHeight: "61vh" }}>
        {loading ? (
          <Grid container spacing={2}>
            <Grid item sm={12} md={12} lg={12} align='center'>
              <GraphSkell />
            </Grid>
          </Grid>
        ) : premiumUser || author ? (
          <>
           <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdrop}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
            {user && <SideDrawer author={author} />}
            <Box
              display='flex'
              justifyContent='space-between'
              w='100%'
              height='91.5vh'
              p='10px'
            >
              {user && <MyChat fetchAgain={fetchAgain} author={author} />}
              {user && (
                <ChatBox
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  author={author}
                />
              )}
            </Box>
          </>
        ) : (
          <>
            <Dialog
              transitionDuration={{ enter: 2000, exit: 0 }}
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
              TransitionComponent={Transition}
            >
              <DialogTitle align='center'>
                <StarsSharpIcon
                  style={{ color: "gold" }}
                  sx={{ fontSize: 80 }}
                />
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
            <Container maxWidth='sm'>
              <Typography align='center'>
                <LockRoundedIcon sx={{ fontSize: 100 }} />
                <Typography sx={{ fontSize: 27, paddingY: "5%" }}>
                  Unlock the access to chat with authors by getting an Premium
                  membership
                </Typography>
                <Button
                  variant='text'
                  onClick={handleClickPremium}
                  sx={{
                    borderRadius: "20%",
                    color: "black",
                    backgroundColor: "gold",
                    padding: "1%",
                    "&:hover": {
                      background: "gold",
                      boxShadow: 4,
                    },
                  }}
                >
                  Try it
                </Button>
              </Typography>
            </Container>
          </>
        )}
      </Container>
      <FooterComp />
    </>
  );
};

export default ChatHome;
