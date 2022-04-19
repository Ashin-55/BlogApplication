// import React from "react";

// import axios from "axios";
// import Stripe from "react-stripe-checkout";
// const Payment = () => {
//   const handleToken = (totalAmmout, token) => {
//     try {
//       axios.post("/pay", { token: token.id, amount: totalAmmout });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const tokenHandler = (token) => {
//     console.log("token handler");
//     handleToken(100, token);
//   };
//   return (
//     <div>
//       <Stripe
//         stripeKey='pk_test_51KfixGSGd7F9olVcxH3AjZZy20a4ql8fvLwkyl2IdXlUyLqNw0vMjQRiyJquxlG8j1eqf2ptg422ZX8LQoytAbSE00DMtGrsB5'
//         token={tokenHandler}
//       />
//     </div>
//   );
// };

// export default Payment;
