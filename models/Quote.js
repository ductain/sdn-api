const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteSchema = new Schema(
  {
    packageType: {
      type: Number,
      required: true,
    },
    packageCost: {
      type: Number,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
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
