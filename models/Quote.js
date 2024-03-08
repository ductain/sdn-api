const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteSchema = new Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
    },
    total: {
      //tong cua packageCost + totalItemsCost cua project
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

const Quotes = mongoose.model("Quotes", quoteSchema);
module.exports = Quotes;
