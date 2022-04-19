const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    status: { type: Boolean, default: true },
    approvedByAdmin: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    indroduction: { type: String },
    city: { type: String },
    state: { type: String },
    address: { type: String },
    likedItems:[{type:mongoose.Schema.Types.ObjectId,ref:"postData"}]
  },
  {
    collection: "authorColletion",
  }
);

authorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
authorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const authModel = mongoose.model("authorModel", authorSchema);
module.exports = authModel;
