const express = require("express");
const purchaseController = require("../controllers/purchase");
const authorization = require("../middleware/auth");

const routes = express.Router();



 routes.get("/premium",authorization.authorize,purchaseController.purchasePremium);

 routes.post("/updatetransaction",authorization.authorize,purchaseController.updateTranscation);





module.exports = routes;