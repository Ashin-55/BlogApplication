const router = require("express").Router();
const {
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
  deleteExplorePost,allAuthorsPrint
} = require("../controllers/adminController");

const adminProtect = require("../middleware/adminAuthMiddleware");

router.post("/login", adminLogin);
router.get("/allUser", adminProtect, allUsers);
router.get("/allPreUser", adminProtect, allPreUsers);
router.get("/allAuthors", adminProtect, allAuthors);
router.get("/allAuthorsPrintData", adminProtect, allAuthorsPrint);
//dashBorad
router.get("/recentPost", adminProtect, recentPost);
router.get("/newUsers", adminProtect, newUsers);
router.get("/activeAuthor", adminProtect, activeAuthor);
router.get("/premiumCount", adminProtect, premiumCount);
router.get("/getAuthorPostDetails/:id",adminProtect,getAuthorPostDetails)
router.get("/getAuthorData/:id",adminProtect,getAuthorDetail)
router.get("/blockUser/:id",adminProtect,blockUser)
router.get("/unblockUser/:id",adminProtect,unBlockUser)
router.get("/exploreData",adminProtect,fetchExploreData)

router.delete("/postDelete/:id",adminProtect,deletePost)
router.delete("/deleteExploreData/:id",adminProtect,deleteExplorePost)
//exploreData
router.post("/exploreData",adminProtect,createExploreData)

module.exports = router;
