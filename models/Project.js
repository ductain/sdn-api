const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
