const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, default:"firstname" },
    lastName: { type: String, default:"lastname" },
    password: { type: String,required:true},
    email: { type: String, required: true, unique: true },
    phone: { type: Number},
    premiumUser: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    authorStatus: { type: Boolean, default: false },
    indroduction: { type: String },
    city: { type: String },
    state: { type: String },
    address: { type: String },
    wishlistItems:[{type:mongoose.Schema.Types.ObjectId,ref:"postData"}],
    likedItems:[{type:mongoose.Schema.Types.ObjectId,ref:"postData"}]
  },
  {
    collection: "userCollection",
    timestamps: true
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password =  await bcrypt.hash(this.password, salt);
});

const model = mongoose.model("userData", userSchema);
module.exports = model;
