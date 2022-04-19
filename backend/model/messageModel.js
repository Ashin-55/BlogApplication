const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "userData" },
    sender2: { type: mongoose.Schema.Types.ObjectId, ref: "authorModel" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  {
    timestamp: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
