const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema =  new Schema({
 amount:{
    type:String,
    required :true
  },
  descripiton:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }
});
  
module.exports = mongoose.model('Expense',expenseSchema);





// const Sequelize = require("sequelize");


// const sequelize = require("../utils/database");

// const Expense = sequelize.define("expense", {
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     amount:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     descripiton:{
//         type:Sequelize.STRING,
//         allowNull:false
        
//     },
//     category:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })

// module.exports = Expense;