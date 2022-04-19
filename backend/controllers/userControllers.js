const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const userSchema = require("../model/userModel");
const authorSchema = require("../model/authorModel");
const Post = require("../model/postModel");
const postModel = require("../model/postModel");
const genarateToken = require("../utils/generateToken");
const { OAuth2Client } = require("google-auth-library");
require("dotenv");
const { v4: uuidv4 } = require("uuid");
const exploreDataModel = require("../model/exploreDataModel");
const Activity = require("../model/activityLogModal");

const googleClient = new OAuth2Client(
  "54033475997-q83ic1psia0haeqael0bm58hphg1rtp5.apps.googleusercontent.com"
);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const stripe_secret = process.env.STRIPE_SECRET;
console.log("accountSid :", process.env.TWILIO_ACCOUNT_SID);
console.log("authToken :", process.env.TWILIO_AUTH_TOKEN);
console.log("stripe_secret :", process.env.STRIPE_SECRET);
const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const stripe = require("stripe")(stripe_secret);

let signupbody = {};
let mobileNumber = {};

const getAllPost = async (req, res) => {
  try {
    await postModel
      .find()
      .sort({ createdAt: -1 })
      .populate("authorId")
      .exec((err, allPost) => {
        if (err) {
          console.log("in error userController gett all post ");
          console.log(err);
          res.status(500).json({ message: err });
        } else {
          res.status(200).json({ allPost: allPost });
        }
      });
  } catch (error) {
    console.log("error is that ", error);
  }
};
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let user = await userSchema.findOne({ email });
  if (user.status == false) {
    res.status(200).json({
      permission: false,
      message: "Permission blocked by Admin,Try Agin later",
    });
  } else if (user && (await user.matchPassword(password))) {
    // console.log("login succ");
    res.status(200).json({
      permission: true,
      status: "ok",
      message: "login success",
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: genarateToken(user._id),
    });
  } else {
    console.log("invalid email or password");
    res.status(401).json({ message: "invalid email or otp " });
    // throw new Error("invalid email or password");
  }
});

const userSignup = async (req, res) => {
  signupbody = req.body;

  const userExists = await userSchema.findOne({ email: req.body.email });
  const checkMobile = await userSchema.findOne({ phone: req.body.phone });

  if (checkMobile || userExists) {
    console.log("mobile number is allready used");
    res.status(500).json({ message: "user allready exists" });
  } else {
    client.verify
      .services(process.env.TWILIO_SERVICE_ID)
      .verifications.create({ to: `+91${req.body.phone}`, channel: "sms" })
      .then((data) => {
        res.status(200).json({ message: data.to });
      })
      .catch((error) => {
        console.log("error", error);
        res.status(500).json({ message: error });
      });
  }
};
const checkItemFavrites = asyncHandler(async (req, res) => {
  const { id, userId } = req.body;
  try {
    const user = await userSchema.find({ _id: userId });

    const isInArray = user[0].wishlistItems.some(function (item) {
      return item.equals(id);
    });
    res.status(200).json({ postPresent: isInArray });
  } catch (error) {
    console.log("the error is ", error);
    res.status(400).json({ message: "failed", error: error });
  }
});
const addToWish = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;
  const user = await userSchema.find({ _id: userId });
  // console.log(user);
  // console.log(postId);
  const isInArray = user[0].wishlistItems.some(function (item) {
    return item.equals(postId);
  });

  if (isInArray) {
    console.log("post allredy in");
    userSchema
      .updateOne({ _id: userId }, { $pull: { wishlistItems: postId } })
      .exec()
      .then((response) => {
        res.status(200).json({
          message: "Removed from Favorites",
          value: 0,
          result: response,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error });
      });
  } else {
    console.log("post not found");
    userSchema
      .updateOne({ _id: userId }, { $addToSet: { wishlistItems: postId } })
      .exec()
      .then((response) => {
        res
          .status(200)
          .json({ message: "Added to favorites", value: 1, result: response });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error });
      });
  }
});
const getLikedItem = asyncHandler(async (req, res) => {
  const userid = req.params.id;
  let likedListIDS = [];
  try {
    await userSchema
      .findById(userid)
      .populate("likedItems")
      .exec((err, data) => {
        if (err) {
          res.status(500).json({ message: "failed to get likeditems" });
        } else {
          for (x of data.likedItems) {
            likedListIDS.push(x?._id);
          }

          res
            .status(200)
            .json({ message: data.likedItems, likedListIDS: likedListIDS });
        }
      });
  } catch (error) {
    console.log("the errror is ", error);
    res
      .status(400)
      .json({ message: "failed to get wishlist items", error: error });
  }
});
const getWishItem = asyncHandler(async (req, res) => {
  let wishlistIdS = [];
  const userid = req.params.id;
  await userSchema
    .findById(userid)
    .populate("wishlistItems")
    .exec((err, data) => {
      if (err) {
        console.log("the error is :", err);
        res.status(500).json({ message: "something wrong", error: err });
      } else {
        for (x of data.wishlistItems) {
          wishlistIdS.push(x?._id);
        }

        res
          .status(200)
          .json({ message: data.wishlistItems, wishlistIdS: wishlistIdS });
      }
    });
});

const verifyOtp = asyncHandler(async (req, res) => {
  const otp = req.body.otp;
  client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({
      to: `+91${signupbody.phone}`,
      code: otp,
    })
    .then(async (verification_check) => {
      const user = await userSchema.create(signupbody);
      // console.log("below is user ");

      if (user) {
        res.status(201).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: genarateToken(user._id),
        });
      } else {
        console.log("invalid userdata ");
        res.status(400);
        throw new Error("invalid user data");
      }
    })
    .catch((err) => {
      console.log("in error case", err);
      res.status(500).json({ message: "invalid otp" });
    });
});

const premiumMember = async (req, res, next) => {
  const { token, premium, userId } = req.body;
  const amountPay = premium.price / 100;

  let error, status;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const idempotencyKey = Number(userId);
    const charge = await stripe.charges.create(
      {
        amount: premium.price,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `purchaced the ${premium.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );
    // console.log("charge:", { charge });
    status = "success";
  } catch (error) {
    console.log("Error:::", error);
    status = "failure";
  }
  if (status === "success") {
    // console.log(userId);
    // userSchema.findOne({_id:userId},(err,data)=>{
    //   if(err) console.log(err);
    //   else console.log(data);
    // })
    const user = await userSchema.findOne({ _id: userId });
    // console.log("user:", user);
    const response = await userSchema.updateOne(
      { _id: userId },
      { premiumUser: true }
    );
  }
  res.json({ error, status });
};

const checkUser = async (req, res) => {
  const userId = req.params.id;
  const data = await userSchema.findById(userId);
  res.status(200).json({ message: data });
};

//chat message related things
// /api/user
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // console.log("the search word is :", keyword);

  const authors = await authorSchema
    .find(keyword)
    .find({ _id: { $ne: req.user._id } });

  res.send(authors);
});

const googleLogin = asyncHandler(async (req, res) => {
  const tokenId = req.body.data.tokenId;

  googleClient
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "54033475997-q83ic1psia0haeqael0bm58hphg1rtp5.apps.googleusercontent.com",
    })
    .then(async (response) => {
      const { email_verified } = response.payload;

      const data = {
        firstName: response.payload.given_name,
        lastName: response.payload.family_name,
        email: response.payload.email,
        password: `${response.payload.email}@99`,
      };
      if (email_verified) {
        const user = await userSchema.find({ email: data.email });

        if (user[0]) {
          res.status(200).json({
            status: "ok",
            message: "login success",
            _id: user[0]._id,
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email,
            permission: user[0].status,
            token: genarateToken(user[0]._id),
          });
        } else {
          console.log("user not found");
          userSchema
            .create(data)
            .then((response) => {
              res.status(200).json({
                status: "ok",
                message: "login success",
                _id: response._id,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                token: genarateToken(response._id),
              });
            })
            .catch((err) => {
              console.log("create user error is ");
              console.log(err);
              return res
                .status(400)
                .json({ message: "something went to wrong", error: err });
            });
        }
      } else {
        console.log("email is not verified");
        res.status(400).json({ message: "email is verified" });
      }
    });
});

const getProfileData = asyncHandler(async (req, res) => {
  try {
    const data = await userSchema.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    console.log("error come =>", error);
    res.status(400).json({ message: "failed to fetch data", error: error });
    throw new Error(error);
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  userSchema
    .findByIdAndUpdate(req.user._id, req.body)
    .then((response) => {
      res.status(200).json({ message: "Profile updated succefully" });
    })
    .catch((err) => {
      console.log("the error was", err);
      res.status(400).json({
        message: "Something wrong please try again later",
        error: err,
      });
    });
});

const getExploreData = asyncHandler(async (req, res) => {
  try {
    const data = await exploreDataModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.log("the error is come ", error);
    res
      .status(400)
      .json({ message: "cant fetch all data please try again", error: error });
  }
});

const getSingleExploreData = asyncHandler(async (req, res) => {
  try {
    const data = await exploreDataModel.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    console.log("the error is ", error);
    res
      .status(400)
      .json({ message: "something wrong try again later", error: error });
  }
});
const postLike = asyncHandler(async (req, res) => {
  const { postId, userId, ownerID } = req.body;
  const datas = {
    userId: userId,
    postId: postId,
    ownerID: ownerID,
  };
  try {
    const user = await userSchema.findById(userId);
    const isInArray = user.likedItems.some((item) => item.equals(postId));
    console.log(user.likedItems);
    console.log(postId);
    console.log(isInArray);
    if (isInArray) {
      console.log("allredy liked post");
      userSchema
        .findByIdAndUpdate(userId, { $pull: { likedItems: postId } })
        .exec()
        .then(async (response) => {
          await postModel.findByIdAndUpdate(postId, {
            $inc: { likeCount: -1 },
          });
          Activity.findOneAndDelete({ postId: postId }, (err, data) => {
            if (err) {
              console.log("the activity log error is:", err);
            }
            console.log("the activity result is:", data);
          });
          res
            .status(200)
            .json({ message: "like removed", result: response, value: 0 });
        })
        .catch((err) => {
          console.log("the error is ", err);
          res
            .status(400)
            .json({ message: "failed to remove like", error: err });
        });
    } else {
      console.log("post now liked");
      userSchema
        .findByIdAndUpdate(userId, { $addToSet: { likedItems: postId } })
        .exec()
        .then(async (response) => {
          await postModel.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });
          Activity.create(datas, (err, data) => {
            if (err) {
              console.log("the activity log error is:", err);
            }
            console.log("the activity result is:", data);
          });
          res
            .status(200)
            .json({ message: "post liked ...", response: response, value: 1 });
        })
        .catch((error) => {
          console.log("the like post error is ", error);
          res
            .status(400)
            .json({ message: "failed to like the post", error: error });
        });
    }
  } catch (error) {
    console.log("the error is:", error);
    res.status(400).json({ message: "failed to like", error: error });
  }
});

const checkPostLiked = asyncHandler(async (req, res) => {
  const { id, userId } = req.body;
  try {
    const user = await userSchema.findById(userId);
    const isInArray = user.likedItems.some(function (item) {
      return item.equals(id);
    });
    console.log("user sideliked post is in array", isInArray);
    res.status(200).json({ postPresent: isInArray });
  } catch (error) {
    console.log("the error is :", error);
    res.status(400).json({ message: "failed", error: error });
  }
});

const getPopularPost = async (req, res) => {
  try {
    await postModel
      .find()
      .sort({ likeCount: -1 })
      .limit(3)
      .populate("authorId")
      .exec((err, allPost) => {
        if (err) {
          console.log("in error userController gett all post ");
          console.log(err);
          res.status(500).json({ message: err });
        } else {
          res.status(200).json({ allPost: allPost });
        }
      });
  } catch (error) {
    console.log("error is that ", error);
  }
};
const activeAuthors = async (req, res) => {
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
      { $unwind: "$authorData" },
      { $project: { count: 1, authorData: 1, _id: 0 } },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 3,
      },
    ]);
    console.log(data);
    res.status(200).json({ message: data });
  } catch (error) {
    console.log("the error is =>", error);
    res.status(400);
    throw new Error(error);
  }
};
module.exports = {
  getAllPost,
  userSignup,
  userLogin,
  addToWish,
  getWishItem,
  verifyOtp,
  premiumMember,
  checkUser,
  googleLogin,
  getProfileData,
  updateProfile,
  getExploreData,
  getSingleExploreData,
  checkItemFavrites,
  postLike,
  getLikedItem,
  checkPostLiked,
  getPopularPost,
  activeAuthors,
  /////
  allUsers,
};
