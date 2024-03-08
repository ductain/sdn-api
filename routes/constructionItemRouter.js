const express = require("express");
const constructionItemController = require("../controllers/constructionItemController");
const constructionItemRouter = express.Router();
constructionItemRouter
  .route("/")
  .get(constructionItemController.getAll)
  .post(constructionItemController.create);

  constructionItemRouter
  .route("/:Id")
  .get(constructionItemController.getById)
  .put(constructionItemController.updateById)
  .delete(constructionItemController.delete);

module.exports = constructionItemRouter;
