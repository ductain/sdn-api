const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const constructionItemsOrder = new Schema({
  constructionItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ConstructionItems",
  },
  quantity:{
    type: Number,
  },
  itemCost:{
    //Dongia * quantity
    type: Number,
  }
})

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    floors: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    constructionType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConstructionTypes",
    },
    packageCost:{
      //Gia uoc tinh xay dung goi da chon (chua bao gom vat lieu)
      type: Number,
    },
    constructionItemsOrder: [constructionItemsOrder],
    totalItemsCost:{
      //Tong gia tri cac vat lieu da chon (so bo)
      type: Number,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Projects", projectSchema);
module.exports = Project;
