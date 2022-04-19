import React from "react";
import FooterComp from "../../Components/Footer/FooterComp";
import AuthHeader from "../../Components/navbar/AuthHeader";
import Mypost from "../../Components/MyPosts/Mypost";
import { Grid } from "@mui/material";

const OwnPost = () => {
  return (
    <div>
      <AuthHeader />
      <Mypost />
      <FooterComp />
    </div>
  );
};

export default OwnPost;
