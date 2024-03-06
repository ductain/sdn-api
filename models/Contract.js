const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contractSchema = new Schema(
  {
    quote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotes",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    constructionItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConstructionItems",
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 2,
    },
  },
  { timestamps: true }
);

const Contract = mongoose.model("Contracts", contractSchema);
module.exports = Contract;
