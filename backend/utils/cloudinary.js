require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'ashproduct',
  api_key: '158996715847238',
  api_secret: 'Q4im6VNWSb5jmP87kG9qrUg6-0o',
});

module.exports = { cloudinary };
