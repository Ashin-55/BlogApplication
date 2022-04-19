import axios from "axios";
import React, { useEffect, useState } from "react";

import AllusersList from "../../Components/Admin.js/AllusersList";
import DenseTable from "../../Components/Admin.js/DenseTable";
import FooterComp from "../../Components/Footer/FooterComp";
import AdminHeader from "../../Components/navbar/AdminHeader";

const Allusers = () => {
  return (
    <div>
      <AdminHeader/>
      <AllusersList />
      <FooterComp />
    </div>
  );
};

export default Allusers;
