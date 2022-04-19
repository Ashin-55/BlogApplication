import React from "react";
import AuthHeader from "../../Components/navbar/AuthHeader";
import BodyContent from "../../Components/Body/BodyContent";
import FooterComp from "../../Components/Footer/FooterComp";
import { Grid } from "@mui/material";

const AuthHome = () => {
  return (
    <div>
      <AuthHeader />
      <Grid container spacing={2}>
        <BodyContent author={true}/>
      </Grid>
      <FooterComp/>
    </div>
  );
};

export default AuthHome;
