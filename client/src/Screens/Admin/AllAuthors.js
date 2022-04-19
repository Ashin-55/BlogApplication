import React from "react";
import AuthorsList from "../../Components/Admin.js/AuthorsList";
import FooterComp from "../../Components/Footer/FooterComp";
import AdminHeader from "../../Components/navbar/AdminHeader";
const AllAuthors = () => {
  return (
    <div>
      <AdminHeader />
      <AuthorsList />
      <FooterComp />
    </div>
  );
};

export default AllAuthors;
