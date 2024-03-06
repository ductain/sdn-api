var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      uniqued: true
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    YOB: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;