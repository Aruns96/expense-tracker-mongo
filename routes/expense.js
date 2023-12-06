const express = require("express");
const expenseController = require("../controllers/expense");
const authorization = require("../middleware/auth");

const routes = express.Router();



 routes.get("/get-expense",authorization.authorize,expenseController.getExpense);

 routes.post("/addExpense",authorization.authorize,expenseController.postAddExpense);

 routes.delete("/delete-expense/:id",authorization.authorize,expenseController.deleteExpense);



module.exports = routes;