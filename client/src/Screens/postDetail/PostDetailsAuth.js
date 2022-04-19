import React, { useEffect } from "react";
import FooterComp from "../../Components/Footer/FooterComp";
import SinglePost from "../../Components/singlePost/SinglePost";
import AuthHeader from "../../Components/navbar/AuthHeader";

const PostDetail = () => {
  const authorInfo = localStorage.getItem("authorInfo");
  console.log("haiii", authorInfo);
  useEffect(() => {}, []);

  return (
    <div>
      <AuthHeader />
      <SinglePost author={true}/>
      <FooterComp />
    </div>
  );
};

export default PostDetail;
