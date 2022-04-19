const asynHandler = require("express-async-handler");
const Admin = require("../model/adminModel");
const User = require("../model/userModel");
const Author = require("../model/authorModel");
const exploreDataModel = require("../model/exploreDataModel");
const Post = require("../model/postModel");
const generateToken = require("../utils/generateToken");
const { cloudinary } = require("../utils/cloudinary");
const adminLogin = asynHandler(async (req, res) => {
  const { email, password } = req.body;

  let admin = await Admin.find();
  if (!email || !password) {
    console.log("email and password not provided");
    res.status(400).json({ message: "Please fill all field" });
  } else {
    if (admin && admin[0].password == password) {
      console.log("admin login success");
      res.status(200).json({
        message: "Login Success",
        status: "ok",
        token: generateToken(admin[0]),
      });
    } else {
      console.log("Login fail");
      res.status(400).json({ message: "invalid email or password" });
    }
  }
});
const allUsers = asynHandler(async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log("the error is =>", error);
    res.status(400);
    throw new Error(error);
  }
});
const allPreUsers = asynHandler(async (req, res) => {
  try {
    const preUser = await User.find({ premiumUser: true });
    res.status(200).json(preUser);
  } catch (error) {
    console.log("the error is =>", error);
    res.status(400);
    throw new Error(error);
  }
});
const allAuthorsPrint =asynHandler(async(req,res)=>{
  try {
    const data = await Author.find()
    res.status(200).json(data);
  } catch (error) {
    console.log("the error is =>", error);
    res.status(400);
    throw new Error(error);
  }
})
const allAuthors = asynHandler(async (req, res) => {
  try {
    let data = await Post.aggregate([
      {
        $group: {
          _id: "$authorId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "authorColletion",
          localField: "_id",
          foreignField: "_id",
          as: "authorData",
        },
      },
      {$unwind: '$authorData'},
    ]);
    res.status(200).json(data);
    console.log(data)

  } catch (error) {
    console.log("the error is =>", error);
    res.status(400);
    throw new Error(error);
  }
});
const recentPost = asynHandler(async (req, res) => {
  console.log("recent post");
  try {
    const data = await Post.find()
      .populate("authorId")
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json({ post: data });
  } catch (error) {
    console.log("error is come =>", error);
    res.status(400);
    throw new Error(error);
  }
});
const newUsers = asynHandler(async (req, res) => {
  console.log("new Users");

  try {
    const data = await User.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json({ message: data });
  } catch (error) {
    console.log("the error was =>", error);
    res.status(400);
    throw new Error(error);
  }
});

const activeAuthor = asynHandler(async (req, res) => {
  console.log("active author");

  try {
    let data = await Post.aggregate([
      {
        $group: {
          _id: "$authorId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "authorColletion",
          localField: "_id",
          foreignField: "_id",
          as: "authorData",
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    res.status(200).json({ message: data });
  } catch (error) {
    console.log("the error is =>", error);
    res.status(400);
    throw new Error(error);
  }
});
const premiumCount = asynHandler(async (req, res) => {
  console.log("premium count");

  try {
    const premiumUser = await User.find({ premiumUser: true }).count();
    const normalUser = await User.find({ premiumUser: false }).count();
    res.status(200).json({ premiumUser, normalUser });
  } catch (error) {
    console.log("the error is =>", error);
    res.status(400);
    throw new Error(error);
  }
});
const getAuthorPostDetails = asynHandler(async (req, res) => {
  try {
    const details = await Post.find({ authorId: req.params.id });
    res.status(200).json({ message: details });
  } catch (error) {
    console.log("the error is ", error);
    res.status(400).json({ message: "failed to fetch data", error: error });
  }
});
const deletePost = (req, res) => {
  try {
    Post.findByIdAndDelete(req.params.id)
      .then((response) => {
        res.status(200).json({ message: "Post Deleted" });
      })
      .catch((err) => {
        console.log("the error is ", error);
        res.status(400).json({ message: "post delete failed", error: error });
      });
  } catch (error) {
    console.log("the error is ", error);
    res.status(400).json({ message: "something wrong", error: error });
  }
};
const getAuthorDetail = asynHandler(async (req, res) => {
  try {
    const data = await Author.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    console.log("the error is ", error);
    res.status(400).json({ message: "failed" });
    throw new Error(error);
  }
});
const blockUser = asynHandler(async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, {
      status: false,
    });
    res.status(200).json({ message: "user Blocked" });
  } catch (error) {
    console.log("the block user error is ", error);
    res.status(400).json({ message: "failed to block" });
    throw new Error(error);
  }
});
const unBlockUser = asynHandler(async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, { status: true });
    res
      .status(200)
      .json({ message: "User unblocked successfull", result: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "failed to unblock user", error: error });
    throw new Error(error);
  }
});
const createExploreData = asynHandler(async (req, res) => {
  const data = req.body;
  try {
    const imageone = { image1: data.destinationImg };
    const imagetwo = { image2: data.place1img };
    const imagethree = { image3: data.place2img };
    const imagefour = { image4: data.place3img };

    const respose1 = await cloudinary.uploader.upload(imageone.image1);
    const respose2 = await cloudinary.uploader.upload(imagetwo.image2);
    const respose3 = await cloudinary.uploader.upload(imagethree.image3);
    const respose4 = await cloudinary.uploader.upload(imagefour.image4);

    console.log(respose1);
    console.log(respose2);
    console.log(respose3);
    console.log(respose4);
    const exploreData = {
      destinationName: data.destinationName,
      indroduction: data.indroduction,
      timeForVisit: data.timeForVisit,
      food: data.food,
      accommodation: data.accommodation,
      transportation: data.transportation,
      safety: data.safety,
      destinationImg: respose1.secure_url,
      place1: data.place1,
      place1img: respose2.secure_url,
      place2: data.place2,
      place2img: respose3.secure_url,
      place3: data.place3,
      place3img: respose4.secure_url,
    };

    const result = await exploreDataModel.create(exploreData);
    res.status(200).json({ message: "explore data created", result: result });
  } catch (error) {
    console.log("error comes");
    res.status(400).json({ message: "failed to create post", error: error });
  }
});
const fetchExploreData = asynHandler(async (req, res) => {
  try {
    const data = await exploreDataModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.log("erro found:", error);
    res.status(400).json({ message: "failed tofetch data", error: error });
  }
});

const deleteExplorePost = asynHandler(async (req, res) => {
  try {
    const result = await exploreDataModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "post deleted successfully", result: result });
  } catch (error) {
    console.log("the  error commed", error);
    res.status(400).json({ message: "postdeleted succesfully", error: error });
  }
});
module.exports = {
  adminLogin,
  allUsers,
  allPreUsers,
  allAuthors,
  recentPost,
  newUsers,
  activeAuthor,
  premiumCount,
  getAuthorPostDetails,
  deletePost,
  getAuthorDetail,
  blockUser,
  unBlockUser,
  createExploreData,
  fetchExploreData,
  deleteExplorePost,
  allAuthorsPrint
};
