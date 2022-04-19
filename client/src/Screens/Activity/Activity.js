import React from "react";
import AuthHeader from "../../Components/navbar/AuthHeader"
import FooterComp from "../../Components/Footer/FooterComp"
import ActivityComp from "../../Components/Activity/ActivityComp";

const Activity = () => {
  return (
    <>
      <AuthHeader />
      <ActivityComp/>
      <FooterComp />
    </>
  );
};

export default Activity;
