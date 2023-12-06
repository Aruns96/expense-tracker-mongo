const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mongoose = require("mongoose");


exports.authorize =  (req,res,next) => {
    try{
          const token = req.header("Authorization");
          const user = jwt.verify(token,"secretKey");
        
          User.findById(user.userId).then(user=>{
            
            req.user = user;
            next();
          }).catch(e=>{throw new Error(e)})
    }catch(e){
      return res.status(401).json({err:e});
    }
}