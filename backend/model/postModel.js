const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    postTitle: { type: String, required: true },
    subTitle: { type: String, required: true },
    postIndroduction: { type: String, required: true },
    postContent: { type: String, required: true },
    place: { type: String, required: true },
    date: { type: Date, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref:"authorModel" },
    likeCount: { type: Number, default: 0 },
    image1:{type:String,require:true},
    image2:{type:String,require:true},
    image3:{type:String,require:true},
    image4:{type:String,require:true},
    image5:{type:String,require:true},
  },
  {
    collection: "postData",
    timestamps: true,
  }
);

const postModel = mongoose.model("postData", postSchema);

module.exports = postModel;
