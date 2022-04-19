import React from "react";
import FooterComp from "../../Components/Footer/FooterComp";
import Header from "../../Components/navbar/Header";

import WishlistComp from "../../Components/wishlist/WishlistComp";
const Wishlist = () => {
  return (
    <div>
      <Header />
      <WishlistComp />
      <FooterComp />
    </div>
  );
};

export default Wishlist;
