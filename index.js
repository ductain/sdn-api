const express = require("express");
const port = 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const constructionTypeRouter = require("./routes/constructionTypeRouter");
const constructionItemRouter = require("./routes/constructionItemRouter");

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
app.use(express.json());

app.use("/ConstructionTypes", constructionTypeRouter);
app.use("/ConstructionItems", constructionItemRouter);
app.listen(port, () => {
  console.log("Server is running.");
});
