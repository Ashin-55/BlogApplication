const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const authorSchema = require("../model/authorModel");
const postSchema = require("../model/postModel");
const generateToken = require("../utils/generateToken");
const { cloudinary } = require("../utils/cloudinary");
const Activity = require("../model/activityLogModal");

const authSignup = asyncHandler(async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const response = await authorSchema.create(data);
    res
      .status(201)
      .json({ message: "Request successfull", response: response });
  } catch (error) {
    console.log("the err in author signup", error);
    res.status(404);
    throw new Error(error);
  }
});

const authLogin = asyncHandler(async (req, res) => {
  try {
    const author = await authorSchema.findOne({ email: req.body.email });
    // console.log(author);
    if (author && (await author.matchPassword(req.body.password))) {
      console.log("login success");
      res.status(200).json({
        message: "Login successfull",
        _id: author._id,
        firstName: author.firstName,
        lastName: author.lastName,
        email: author.email,
        token: generateToken(author._id),
      });
    } else {
      console.log("invalid username or password ");
      res.status(400);
      throw new Error("invalid  username or password");
    }
  } catch (error) {
    console.log("catch block");
    console.log(error);
    res.status(500);
    throw new Error(error);
  }
});

const createPost = asyncHandler(async (req, res) => {
  const data = req.body;
  // console.log(data.authorId)
  try {
    const imageone = { image1: data.image1 };
    const imagetwo = { image2: data.image2 };
    const imagethree = { image3: data.image3 };
    const imagefour = { image4: data.image4 };
    const imagefive = { image5: data.image5 };

    const respose1 = await cloudinary.uploader.upload(imageone.image1);
    const respose2 = await cloudinary.uploader.upload(imagetwo.image2);
    const respose3 = await cloudinary.uploader.upload(imagethree.image3);
    const respose4 = await cloudinary.uploader.upload(imagefour.image4);
    const respose5 = await cloudinary.uploader.upload(imagefive.image5);

    const details = {
      postTitle: req.body.postTitle,
      subTitle: req.body.subTitle,
      postIndroduction: req.body.postIndroduction,
      postContent: req.body.postContent,
      place: req.body.place,
      date: req.body.date,
      authorId: req.body.authorId,
      image1: respose1.secure_url,
      image2: respose2.secure_url,
      image3: respose3.secure_url,
      image4: respose4.secure_url,
      image5: respose5.secure_url,
    };

    const postResponse = await postSchema.create(details);
    // console.log(postResponse);
    res.status(200).json({ message: "post created succesfully" });
  } catch (error) {
    console.log("error is :", error);
    res.status(500);
    throw new Error(error);
  }
});

const getAllPost = async (req, res) => {
  try {
    let authorId = req.params.id;

    const allPost = await postSchema
      .find({ authorId: { $ne: authorId } })
      .sort({ createdAt: -1 })
      .populate("authorId")
      .exec((err, allPost) => {
        if (err) {
          res.status(500).json({ message: err });
          console.log("error is that ", err);
        } else {
          res.status(200).json({ allPost: allPost });
        }
      });
  } catch (error) {
    console.log("error is that ", error);
  }
};

const getPostDetail = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  try {
    const postDetail = await postSchema.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(postId) } },
      {
        $lookup: {
          from: "authorColletion",
          localField: "authorId",
          foreignField: "_id",
          as: "autherData",
        },
      },
      {
        $unwind: "$autherData",
      },
    ]);
    res.status(200).json({ postDetails: postDetail });
  } catch (error) {
    console.log("error come ", error);
    res.status(500).json({ message: error });
    throw new Error(error);
  }
});

const getMypost = asyncHandler(async (req, res) => {
  const authorId = req.params.authorId;
  try {
    const mypost = await postSchema
      .find({ authorId: mongoose.Types.ObjectId(authorId) })
      .sort({ createdAt: -1 });
    res.status(200).json({ mypost: mypost });
  } catch (error) {
    console.log("error come", error);
    res.status(500);
    throw new Error(error);
  }
});

const myPostDetails = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  try {
    const mypostDetails = await postSchema
      .find({ _id: mongoose.Types.ObjectId(postId) })
      .sort({ createdAt: -1 });
    // console.log(mypostDetails);
    res.status(200).json({ mypostDetails: mypostDetails });
  } catch (error) {
    console.log("error comes: ", error);
    res.status(500);
    throw new Error(error);
  }
});

const profileData = asyncHandler(async (req, res) => {
  const autherId = req.params.id;
  console.log(autherId);
  try {
    const profile = await authorSchema.find({
      _id: mongoose.Types.ObjectId(autherId),
    });
    res.status(200).json({ profileData: profile });
  } catch (error) {
    console.log("error come ", error);
    res.status(500);
    throw new Error(error);
  }
});

const editProfileData = asyncHandler(async (req, res) => {
  const autherId = req.params.id;
  try {
    const profile = await authorSchema.findById({ _id: autherId });
    res.status(200).json({ profileData: profile });
  } catch (error) {
    console.log("error come ", error);
    res.status(500);
    throw new Error(error);
  }
});

const getAuthorData = async (req, res) => {
  try {
    const authorid = req.params.id;
    const authData = await authorSchema.find({
      _id: mongoose.Types.ObjectId(authorid),
    });
    const postData = await postSchema
      .find({ authorId: mongoose.Types.ObjectId(authorid) })
      .sort({ createdAt: -1 });
    res.status(200).json({ authData: authData, postData: postData });
  } catch (error) {
    console.log("error come", error);
    res.status(500).json({ message: "failed get data ", error: error });
  }
};
const likePost = asyncHandler(async (req, res) => {
  const { postId, autherId, ownerID } = req.body;
  const datas = {
    authorId: autherId,
    postId: postId,
    ownerID: ownerID,
  };
  const author = await authorSchema.findById(autherId);
  const isInArray = author.likedItems.some((item) => item.equals(postId));
  if (isInArray) {
    console.log("liked post");
    authorSchema
      .updateOne({ _id: autherId }, { $pull: { likedItems: postId } })
      .exec()
      .then(async (response) => {
        await postSchema.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
        Activity.findOneAndDelete({ postId: postId }, (err, data) => {
          if (err) {
            console.log("the activity log error is:", err);
          }
          console.log("the activity result is:", data);
        });
        res
          .status(200)
          .json({ message: "like removed", result: response, value: -1 });
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .json({ message: "failed to remove like", error: error });
      });
  } else {
    console.log("not liked post");
    authorSchema
      .updateOne({ _id: autherId }, { $addToSet: { likedItems: postId } })
      .exec()
      .then(async (response) => {
        await postSchema.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });
        Activity.create(datas, (err, data) => {
          if (err) {
            console.log("the activity log error is:", err);
          }
          console.log("the activity result is:", data);
        });
        res
          .status(200)
          .json({ message: "post liked", result: response, value: 1 });
      })
      .catch((error) => {
        console.log("the error is =>", error);
        res.status(500).json({ message: error });
      });
  }
});
const deletePost = asyncHandler(async (req, res) => {
  await postSchema
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json({ message: "post deleted" });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
});
const getEditPostData = asyncHandler(async (req, res) => {
  try {
    const data = await postSchema.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    console.log("the error is =>", error);
    res.status(500);
    throw new Error(error);
  }
  const data = await postSchema.findById(req.params.id);
});
const editPost = asyncHandler(async (req, res) => {
  const data = req.body;
  const postid = req.body.postid;
  const base64regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  let imageone, imagetwo, imagethree, imagefour, imagefive;
  let output1, output2, output3, output4, output5;
  try {
    if (base64regex.test(data.image1)) {
      imageone = { image1: data.image1 };
      const respose1 = await cloudinary.uploader.upload(imageone.image1);
      output1 = respose1.secure_url;
    } else {
      output1 = data.image1;
    }
    if (base64regex.test(data.image2)) {
      imagetwo = { image2: data.image2 };
      const respose2 = await cloudinary.uploader.upload(imagetwo.image2);
      output2 = respose2.secure_url;
    } else {
      output2 = data.image2;
    }
    if (base64regex.test(data.image3)) {
      imagethree = { image3: data.image3 };
      const respose3 = await cloudinary.uploader.upload(imagethree.image3);
      output3 = respose3.secure_url;
    } else {
      output3 = data.image3;
    }
    if (base64regex.test(data.image4)) {
      imagefour = { image4: data.image4 };
      const respose4 = await cloudinary.uploader.upload(imagefour.image4);
      output4 = respose4.secure_url;
    } else {
      output4 = data.image4;
    }
    if (base64regex.test(data.image5)) {
      imagefive = { image5: data.image5 };
      const respose5 = await cloudinary.uploader.upload(imagefive.image5);
      output5 = respose5.secure_url;
    } else {
      output5 = data.image5;
    }
    const editData = {
      postTitle: req.body.postTitle,
      subTitle: req.body.subTitle,
      postIndroduction: req.body.postIndroduction,
      postContent: req.body.postContent,
      place: req.body.place,
      date: req.body.date,
      authorId: req.body.authorId,
      image1: output1,
      image2: output2,
      image3: output3,
      image4: output4,
      image5: output5,
    };
    postSchema
      .findByIdAndUpdate(postid, editData)
      .then((result) => {
        res
          .status(200)
          .json({ message: "post updated successfully", result: result });
      })
      .catch((error) => {
        res.status(400).json({ message: "error updating post", error: error });
      });
  } catch (error) {
    console.log("the error is =>", error);
    res.status(500);
    throw new Error(error);
  }
});
const editProfile = asyncHandler(async (req, res) => {
  const data = req.body;
  try {
    await authorSchema
      .findByIdAndUpdate(data.authorId, data)
      .then((response) => {
        res
          .status(200)
          .json({ message: "profile updated", response: response });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ message: "profile updation failed ", error: error });
      });
  } catch (error) {
    console.log("edit profile error is =>", error);
    throw new Error(error);
  }
});

const checkPostLiked = asyncHandler(async (req, res) => {
  const { id, autherId } = req.body;
  try {
    const author = await authorSchema.findById(autherId);
    console.log(author);
    const isInArray = author.likedItems.some(function (item) {
      return item.equals(id);
    });
    console.log("author sideliked post is in array", isInArray);
    res.status(200).json({ postPresent: isInArray });
  } catch (error) {
    console.log("the error is :", error);
    res.status(400).json({ message: "failed", error: error });
  }
});
const getLikedPostId = asyncHandler(async (req, res) => {
  const authorid = req.params.id;
  let likedListIDS = [];
  try {
    await authorSchema
      .findById(authorid)
      .populate("likedItems")
      .exec((err, data) => {
        if (err) {
          console.log("error is:", err);
          res.status(500).json({
            message: "failed to get likeditems",
            likedListIDS: likedListIDS,
          });
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
    res.status(400).json({
      message: "failed to get wishlist items",
      error: error,
      likedListIDS: likedListIDS,
    });
  }
});
const getActivityDetails = asyncHandler(async (req, res) => {
  const authorId = req.author._id;
  try {
    const datas = await Activity.find({ ownerID: authorId })
      .populate("userId", "-password")
      .populate("postId")
      .populate("authorId", "-password")
      .sort({ createdAt: -1 });
    res.status(200).json(datas);
  } catch (error) {
    console.log("the activity error is:", error);
    res
      .status(500)
      .json({ message: "failed to get activity log", error: error });
  }
});
module.exports = {
  authSignup,
  authLogin,
  createPost,
  getAllPost,
  getPostDetail,
  getMypost,
  myPostDetails,
  profileData,
  editProfileData,
  getAuthorData,
  likePost,
  deletePost,
  getEditPostData,
  editPost,
  editProfile,
  checkPostLiked,
  getLikedPostId,
  getActivityDetails,
};
