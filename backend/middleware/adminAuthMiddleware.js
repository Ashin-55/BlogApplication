const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin = require("../model/adminModel");

const adminProtect = asyncHandler(async (req, res, next) => {
  console.log("admin auth middleware called");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SCERET);
      req.admin = await Admin.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log("admin not authorized ", error);
      res.status(401);
      res.send("Token Expired")
      throw new Error("Not Authorized ,Token is failed");
    }
  }
  if (!token) {
    res.status(401);
    res.send("Admin is not authorized,Token is not found");
    throw new Error("Admin is not authorized,Token is not found");
  }
});
module.exports = adminProtect;
