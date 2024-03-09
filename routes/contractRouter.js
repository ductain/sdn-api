const express = require("express");
const contractController = require("../controllers/contractController");

const contractRouter = express.Router();
contractRouter
  .route("/")
  .get(contractController.getAll)
  .post(contractController.create);
contractRouter
  .route("/:Id")
  .get(contractController.getById)
  .put(contractController.updateById)

module.exports = contractRouter;
