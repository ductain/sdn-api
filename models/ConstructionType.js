const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const constructionTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    packageType: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true
    },
  },
  { timestamps: true }
);

const ConstructionTypes = mongoose.model("ConstructionTypes", constructionTypeSchema);
module.exports = ConstructionTypes;