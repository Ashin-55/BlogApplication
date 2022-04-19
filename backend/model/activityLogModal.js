const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "userData" },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "authorModel" },
    ownerID: { type: mongoose.Schema.Types.ObjectId, ref: "authorModel" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "postData" },
  },
  {
    collection: "Activity",
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
