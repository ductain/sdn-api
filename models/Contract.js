const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const constructionItemOrder = new Schema({
//   constructionItem: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "ConstructionItems",
//   }],
//   quantity: number,
// })

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
