const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const constructionItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    packageType: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    //Don gia
    value: {
      type: Number,
      required: true,
    },
    //Bao,cai,thung
    unit: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const ConstructionItems = mongoose.model(
  "ConstructionItems",
  constructionItemSchema
);
module.exports = ConstructionItems;
