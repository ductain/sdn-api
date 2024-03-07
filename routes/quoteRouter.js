const express = require("express");
const quoteController = require("../controllers/quoteController");

const quoteRouter = express.Router();
quoteRouter
  .route("/")
  .get(quoteController.getAll)
  .post(quoteController.create);

quoteRouter
  .route("/:Id")
  .get(quoteController.getById)
  .put(quoteController.updateById)
  .delete(quoteController.delete);

module.exports = quoteRouter;
