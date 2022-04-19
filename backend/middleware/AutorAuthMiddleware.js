const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Author = require("../model/authorModel");

const protect = asyncHandler(async (req, res, next) => {
 
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SCERET);
      req.author = await Author.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log("the auth middleware error is ", error);
      res.status(401);
      throw new Error("Not Authorized,Token Fails");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized ,Token not found");
  }
});

module.exports = protect;
