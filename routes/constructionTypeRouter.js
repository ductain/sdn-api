const express = require("express");
const constructionTypeController = require("../controllers/constructionTypeController");

const constructionTypeRouter = express.Router();
constructionTypeRouter
  .route("/")
  .get(constructionTypeController.getAll)
  .post(constructionTypeController.create);
constructionTypeRouter
  .route("/:Id")
  .get(constructionTypeController.getById)
  .put(constructionTypeController.updateById)
  .delete(constructionTypeController.delete);

module.exports = constructionTypeRouter;
