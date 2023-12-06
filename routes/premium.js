const express = require("express");
const premiumController = require("../controllers/premium");
const authorization = require("../middleware/auth");

const routes = express.Router();



 routes.get("/showleaderboard",authorization.authorize,premiumController.getUserLeaderBoard);
 routes.get("/download",authorization.authorize,premiumController.getDownload);







module.exports = routes;