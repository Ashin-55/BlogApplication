const express = require("express");
const router = express.Router();
const {
  allMessages,
  sendMessage,
  allAuthorMessages,
  sendAuthorMessage
} = require("../controllers/messageController");
const protect  = require("../middleware/authMiddleware");
const authorProtect = require("../middleware/AutorAuthMiddleware")
// router.get("/:chatId", protect, allMessages);
// router.post("/", protect, sendMessage);
router.route("/").post(protect,sendMessage)
router.route("/:chatId").get(protect,allMessages)

router.route("/author").post(authorProtect,sendAuthorMessage)
router.route("/author/:chatId").get(authorProtect,allAuthorMessages)
module.exports = router;
