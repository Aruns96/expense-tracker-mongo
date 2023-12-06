const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forgotPasswordSchema =  new Schema({
    uuid:{
        type:String,
        required:true
    },
    isactive:{
    type:String,
    required:true
  },
  userId:{
    type:mongoose.Types.ObjectId,
    ref:'User'
  }
});
  
module.exports = mongoose.model('Forgotpassword',forgotPasswordSchema);

// const Sequelize = require("sequelize");


// const sequelize = require("../utils/database");

// const Forgotpassword = sequelize.define("forgotpassword", {
//     id:{
//         type:Sequelize.UUID,
//         allowNull:false,
//         primaryKey:true
//     },
    
//     isactive:Sequelize.STRING
    
// })

// module.exports = Forgotpassword;