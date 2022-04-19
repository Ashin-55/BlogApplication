import React from "react";

import PreUsers from "../../Components/Admin.js/PreUsers";
import FooterComp from "../../Components/Footer/FooterComp";
import AdminHeader from "../../Components/navbar/AdminHeader";

const PremiumUser = () => {
  return (
    <div>
      <AdminHeader />
      <PreUsers />
      <FooterComp />
    </div>
  );
};

export default PremiumUser;
