const User = require("../models/user");
const Forgotpassword = require("../models/forgotpassword");
const sequelize = require("../utils/database");
const uuid = require("uuid");
const brevo = require('@getbrevo/brevo');
const bcrypt=require('bcrypt')
//require("dotenv").config()


const postForgotPassword = async(req,res)=>{
    try{
      const email = req.body.email;
      if(email == undefined || email.length == 0 ){
        return   res.status(400).json({err:"bad params"});
      }
      const user=await User.findOne({email:email})
      //console.log("user",user)
      if(user){

        const id=uuid.v4()
          
        const pass = new Forgotpassword({uuid:id,isactive:true,userId:user._id})
         await pass.save();

        let defaultClient = brevo.ApiClient.instance;
    
        let apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.FGT_KEY2;
        
       
        
        let apiInstance = new brevo.TransactionalEmailsApi();
        let sendSmtpEmail = new brevo.SendSmtpEmail();
        
        sendSmtpEmail.subject = "send from brevo";
        sendSmtpEmail.htmlContent = `<a href="http://localhost:3000/password/resetpassword/${id}">reset password</a>`;
        
        sendSmtpEmail.sender = { "name": "Arun", "email": "thatarunsdev@gmail.com" };
        sendSmtpEmail.to = [
          { "email": "arun509577@gmail.com", "name": "sample-name" }
        ];
        
        
        
        const result = await apiInstance.sendTransacEmail(sendSmtpEmail)
          
    
    
         
          console.log(result)
    
          res.status(200).json({message:"mail sent"});
        

      }else{
        throw new Error("user not exitst")
      }
    

     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}
const getResetPassword = async(req,res)=>{
    try{
        const id=req.params.id
        //console.log("par id ",id)
       
          const forgotpasswordrequest =await Forgotpassword.findOne({uuid:id})
         // console.log("fp",forgotpasswordrequest)
            if(forgotpasswordrequest){
                forgotpasswordrequest.isactive = false;
                await forgotpasswordrequest.save();
                res.status(200).send(`<html>
                <script>
                    function formsubmitted(e){
                        e.preventDefault();
                        console.log('called')
                    }
                </script>
                <form action="http://localhost:3000/password/updatepassword/${id}" method="GET">
                    <label for="newpassword">Enter New password</label>
                    <input name="newpassword" type="password" required></input>
                    <button>reset password</button>
                </form>
            </html>`)
            res.end()
            }
      
    





     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}
const getUpdatePassword = async(req,res)=>{
    try{
      
        const {newpassword}=req.query
        console.log('req.quere>>>>>>>>>>>>>>',req.query)
        const {resetpasswordid}=req.params
        const pass = await Forgotpassword.findOne({uuid:resetpasswordid}).populate("userId")
        console.log("pass",pass)
      
            const user = pass.userId;
            console.log("usr",user)
            bcrypt.hash(newpassword, 10, async (err, hash) => {
                user.password = hash;
               
                await user.save();
              });
              res.status(201).json({message:'Successfuly update the new  password'})
                



     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}


module.exports = {postForgotPassword,getResetPassword,getUpdatePassword}