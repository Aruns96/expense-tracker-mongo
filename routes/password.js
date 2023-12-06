const express = require("express");
const passwordController = require("../controllers/password");
const authorization = require("../middleware/auth");

const routes = express.Router();



routes.post("/forgotpassword",passwordController.postForgotPassword);
 routes.get("/resetpassword/:id",passwordController.getResetPassword);
 routes.get("/updatepassword/:resetpasswordid", passwordController.getUpdatePassword)







module.exports = routes;