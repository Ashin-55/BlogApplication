const mongoose = require("mongoose");

const exploreDataSchema = mongoose.Schema(
  {
    destinationName: { type: String, required: true },
    indroduction: { type: String, required: true },
    timeForVisit: { type: String, required: true },
    food: { type: String, required: true },
    accommodation: { type: String, required: true },
    transportation: { type: String, required: true },
    place1: { type: String, required: true },
    place2: { type: String, required: true },
    place3: { type: String, required: true },
    safety: { type: String, required: true },
    destinationImg:{type:String,require:true},
    place1img:{type:String,require:true},
    place2img:{type:String,require:true},
    place3img:{type:String,require:true},
  },
  {
    collection: "exploreData",
    timestamps: true,
  }
);

const exploreDataModel = mongoose.model("exploreData", exploreDataSchema);

module.exports = exploreDataModel;
