const User = require("../models/user");
const Downloadfiles = require("../models/downloadfiles");
const Expense = require("../models/expense");
const sequelize = require("../utils/database");
const S3services = require("../services/S3services")
const AWS = require("aws-sdk");
//require("dotenv").config();


const getUserLeaderBoard = async(req,res)=>{
    try{
   
       const userLeadBoardDetails = await User.find().select('_id name totalexpense').sort({totalexpense:-1});
       //console.log("userlead",userLeadBoardDetails)
       res.status(200).json(userLeadBoardDetails)
 
     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}


const getDownload = async(req,res)=>{
    try{
        if(!req.user.ispremiumuser){
            return res.status(401).json({ success: false, message: 'User is not a premium User'})
        }
       

        const expenses = await Expense.find({userId:req.user._id})
       // console.log(expenses)
        const stringfyExpense = JSON.stringify(expenses);
        const userId = req.user._id;

        const fileName = `expense${userId}/${new Date()}.txt`

        const fileURL = await S3services.uploadToS3(fileName,stringfyExpense);

       
        let downloadFiles = new Downloadfiles({filename:fileName,userId:userId});
        await downloadFiles.save();
        let files = await Downloadfiles.find({userId:userId}).select("filename");

        res.status(200).json({fileURL,message:"sucesss",files});

      
 
     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}


module.exports = {getUserLeaderBoard,getDownload}