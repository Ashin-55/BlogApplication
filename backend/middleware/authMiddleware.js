const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler")
const userSchema = require("../model/userModel");


const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log("token found");
    try {
        token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token,process.env.JWT_SCERET)
        req.user = await userSchema.findById(decoded.id).select('-password')

        next()
    } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error("not authorized, token failed   ")
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("not authorized , no token");
  }

});

module.exports = protect;
