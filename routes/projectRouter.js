const express = require("express");
const projectController = require("../controllers/projectController");

const projectRouter = express.Router();
projectRouter
  .route("/")
  .get(projectController.getAll)
  .post(projectController.create);

projectRouter
  .route("/:Id")
  .get(projectController.getById)
  .put(projectController.updateById)
  .delete(projectController.delete);

module.exports = projectRouter;
