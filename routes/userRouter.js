const express = require("express");
const userController = require('../controllers/userController')

const userRouter = express.Router();
userRouter
  .route("/user/register")
  .post(userController.register)
userRouter
  .route("/user/signin")
  .post(userController.signin)
userRouter
  .route("/user/logout")
  .get(userController.logout)
userRouter
  .route("/user/login/success")
  .get(userController.loginSuccess);
userRouter
  .route("/user/login/failed")
  .get(userController.loginFailed);


module.exports = userRouter;
