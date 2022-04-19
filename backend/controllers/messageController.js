const asyncHandler = require("express-async-handler");
const Message = require("../model/messageModel");
const Chat = require("../model/chatModel");
const User = require("../model/userModel");
const Author = require("../model/authorModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      // .populate("sender", "firstName lastName email")
      .populate("chat");
    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.messages);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("data is empty");
    return res.sendStatus(400);
  }
  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    // message = await message.populate("sender", "firstName lastName");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "firstName  lastName email",
    });
    message = await message.populate({
      path: "chat.authers",
      select: "firstName lastName email",
    });
    ////
    console.log("the latestMessage is:", message);
    ////
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.status(200).json(message);
  } catch (error) {
    console.log("the error is ==>", error);
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           GET /api/Message/author
//@access          Protected
const allAuthorMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      // .populate("sender2", "firstName lastName email")
      .populate("chat");
    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.messages);
  }
});

//@description     Create New Message
//@route           POST /api/Message/author
//@access          Protected
const sendAuthorMessage = asyncHandler(async (req, res) => {
  console.log(req.author,"adsfjh")
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("content or chatid is empty in author");
    return res.sendStatus(400);
  }
  let newMessage = {
    sender: req.author._id,
    sender2: req.author._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    // message = await message.populate("sender", "firstName lastName");
    // message = await message.populate("sender2", "firstName lastName");
    message = await message.populate("chat");
    message = await Author.populate(message, {
      path: "chat.authers",
      select: "firstName lastName email",
    });
    message = await message.populate({
      path: "chat.users",
      select: "firstName lastName email",
    });
    ////
    console.log("the latestMessage is in author :", message);
    ////
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.status(200).json(message);
  } catch (error) {
    console.log(
      "the message controller auther send message error is ==>",
      error
    );
    res.status(400);
    throw new Error(error.messages);
  }
});
module.exports = {
  sendMessage,
  allMessages,
  allAuthorMessages,
  sendAuthorMessage,
};
