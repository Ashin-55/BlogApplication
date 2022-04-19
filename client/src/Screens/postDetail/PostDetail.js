import React, { useEffect } from "react";
import FooterComp from "../../Components/Footer/FooterComp";
import Header from "../../Components/navbar/Header";
import SinglePost from "../../Components/singlePost/SinglePost";

const PostDetail = () => {
  const authorInfo = localStorage.getItem("authorInfo");
  console.log("haiii", authorInfo);
  useEffect(() => {}, []);

  return (
    <div>
      <Header />
      <SinglePost />
      <FooterComp />
    </div>
  );
};

export default PostDetail;
