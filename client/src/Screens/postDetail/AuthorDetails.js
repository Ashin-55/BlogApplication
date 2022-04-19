import React from "react";
import AuthorDetailsComp from "../../Components/AuthorDetails/AuthorDetailsComp";
import FooterComp from "../../Components/Footer/FooterComp";
import Header from "../../Components/navbar/Header";

const AuthorDetails = () => {
  return (
    <>
      <Header />
      <AuthorDetailsComp />
      <FooterComp />
    </>
  );
};

export default AuthorDetails;
