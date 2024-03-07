const express = require("express");
const port = 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const app = express();
const passport = require("passport");
require('./config/passport')(passport)
const constructionTypeRouter = require("./routes/constructionTypeRouter");
const constructionItemRouter = require("./routes/constructionItemRouter");
const projectRouter = require("./routes/projectRouter");
const quoteRouter = require("./routes/quoteRouter");
const userRouter = require("./routes/userRouter");

const connect = mongoose.connect("mongodb://127.0.0.1:27017/SdnProject");
connect.then(
  (db) => {
    console.log("Database connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

app.use(cors());
app.use(cookieParser())


app.use(passport.initialize());
app.use(express.json());

app.use("/construction_types", constructionTypeRouter);
app.use("/construction_items", constructionItemRouter);
app.use("/projects", projectRouter);
app.use("/quotes", quoteRouter);
app.use("/auth", userRouter);

app.listen(port, () => {
  console.log("Server is running.");
});
