import React from "react";
import Dashboard from "../../Components/Admin.js/Dashboard";
import AdminHeader from "../../Components/navbar/AdminHeader";
import FooterComp from "../../Components/Footer/FooterComp";
const Home = () => {
  return (
    <div>
      <AdminHeader />
      <Dashboard />
      <FooterComp />
    </div>
  );
};

export default Home;
