const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema =  new Schema({
  name:{
    type:String,
    required :true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  ispremiumuser:Boolean,
  totalexpense:{
    type:Number,
    default:0
  }
});
  
module.exports = mongoose.model('User',userSchema);




// const Sequelize = require("sequelize");


// const sequelize = require("../utils/database");

// const User = sequelize.define("user", {
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         unique:true
//     },
//     password:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     ispremiumuser:Sequelize.BOOLEAN,
//     totalexpense:{
//         type:Sequelize.INTEGER,
//         defaultValue:0

//     }
// })

// module.exports = User;