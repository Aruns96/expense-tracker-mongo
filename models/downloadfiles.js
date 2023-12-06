const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const downloadFilesSchema =  new Schema({
    filename:{
    type:String
  },
  
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }
});
  
module.exports = mongoose.model('Downloadfiles',downloadFilesSchema);


// const Sequelize = require("sequelize");


// const sequelize = require("../utils/database");

// const Downloadfiles = sequelize.define("downloadfile", {
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     filename:{
//         type:Sequelize.STRING,
        
//     },
    
// })

// module.exports = Downloadfiles;