const router = require("express").Router();
const {
  userSignup,
  userLogin,
  addToWish,
  getWishItem,
  verifyOtp,
  premiumMember,
  checkUser,
  getAllPost,
  allUsers,
  googleLogin,
  getProfileData,
  updateProfile,
  getExploreData,
  getPopularPost,
  getSingleExploreData,
  checkItemFavrites,
  postLike,
  getLikedItem,
  checkPostLiked,
  activeAuthors
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");

// router.get("/postDetail/:id")
router.get("/home", getAllPost);
router.get("/popularPost", getPopularPost);
router.get("/activeAuthors", activeAuthors);
router.get("/checkUserPremium/:id", checkUser);
router.get("/getWishlist/:id", getWishItem);
router.get("/getLikedList/:id", getLikedItem);

router.get("/profileDetails/:id", protect, getProfileData);
router.get("/allExploreData/", getExploreData);
router.get("/getSingleExploreData/:id", getSingleExploreData);

router.put("/editProfile/:id", protect, updateProfile);

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.post("/wishlist", addToWish);
router.post("/chechPostfavrite", checkItemFavrites);
router.post("/checkPostLikedorNot", checkPostLiked);
router.post("/verification", verifyOtp);
router.post("/premium", premiumMember);
router.post("/likePost", postLike);
// router.post("/likePost",addToLike)
//google login
router.post("/googleLogin", googleLogin);

//chat message realated routers
//   /api/user
router.get("/api/user", protect, allUsers);
module.exports = router;
