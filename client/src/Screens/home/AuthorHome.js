import React, { useEffect } from "react";
import Header from "../../Components/navbar/Header";
import BodyContent from "../../Components/Body/BodyContent";
import FooterComp from "../../Components/Footer/FooterComp";
import { Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../Components/navbar/AuthHeader";

const AuthorHomepage = () => {
  const navigate = useNavigate();

  const authorIfo = localStorage.getItem("authorInfo");
 
  useEffect(() => {
    if (!authorIfo) {
      navigate("/author/authorLogin");
    }
  }, []);
  return (
    <div>
      {authorIfo && (
        <>
          <AuthHeader />
          <Grid container spacing={1} sx={{ paddingX: "5%" }}>
            <BodyContent author={true} />
          </Grid>
          <FooterComp />
        </>
      )}
    </div>
  );
};

export default AuthorHomepage;
