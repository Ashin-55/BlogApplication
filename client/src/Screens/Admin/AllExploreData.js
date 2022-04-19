import React from 'react'
import AllExploreDatas from "../../Components/Admin.js/AllExlopreDatas";
import FooterComp from "../../Components/Footer/FooterComp";
import AdminHeader from "../../Components/navbar/AdminHeader";

const AllExploreData = () => {
  return (
    <>
     <AdminHeader />
      <AllExploreDatas />
      <FooterComp />
    </>
  )
}

export default AllExploreData