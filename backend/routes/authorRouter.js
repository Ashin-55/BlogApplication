const router = require("express").Router();
const authorProtect = require("../middleware/AutorAuthMiddleware");
const {
  getMypost,
  authLogin,
  authSignup,
  createPost,
  getAllPost,
  getPostDetail,
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
  getActivityDetails
} = require("../controllers/authorController");

router.get("/postDetail/:id", getPostDetail);
router.get("/home/:id", authorProtect,getAllPost);
router.get("/mypost/:authorId", authorProtect, getMypost);
router.get("/mypostDetail/:id", authorProtect, myPostDetails);
router.get("/profile/:id", authorProtect, profileData);
router.get("/deletePost/:id", authorProtect, deletePost);
router.get("/editPost/:id", authorProtect, getEditPostData);
router.get("/getLikedList/:id", authorProtect, getLikedPostId);
router.get("/activity", authorProtect, getActivityDetails);
//check these path
router.get("/authordetails/:id", getAuthorData);
router.get("/editProfile/:id", authorProtect, editProfileData);

router.post("/authorSignup", authSignup);
router.post("/authorLogin", authLogin);
router.post("/editProfile", authorProtect, editProfile);
router.post("/editPost", authorProtect, editPost);
router.post("/newpost", authorProtect, createPost);
router.post("/likePost", authorProtect, likePost);
router.post("/checkPostLiked", authorProtect, checkPostLiked);

module.exports = router;
