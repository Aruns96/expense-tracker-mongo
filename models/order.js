const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema =  new Schema({
    paymentid:{
    type:String
  },
  orderid:{
    type:String
  },
  status:{
    type:String
  },
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }
});
  
module.exports = mongoose.model('Order',orderSchema);




//  const Sequelize = require("sequelize");


// const sequelize = require("../utils/database");

// const Order = sequelize.define("order", {
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     paymentid:Sequelize.STRING,
//     orderid:Sequelize.STRING,
//     status:Sequelize.STRING
    
// })

// module.exports = Order;