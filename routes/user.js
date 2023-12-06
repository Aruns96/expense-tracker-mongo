const express = require("express");
const userController = require("../controllers/user")

const routes = express.Router();

routes.post("/sign-up",userController.postSignup);

 routes.post("/login",userController.postLogin)

module.exports = routes;



