
const Order = require("../models/order");
const Razorpay = require("razorpay");
const User = require("../models/user");
const userController = require("../controllers/user")
//require("dotenv").config()


exports.purchasePremium = async (req,res) =>{
    try{
       var rzp = new Razorpay({
        key_id:process.env.RAZORPAY_KEYID,
        key_secret:process.env.RAZORPAY_KEYSECRET
       });
      
       const amount = 2500;

    

       rzp.orders.create({amount,currency:'INR'},async(err,order)=>{
        if(err){
            throw new Error('Something Went Wrong')
        }
       
        const orderId = order.id;
        const odr = new Order({orderid:orderId,status:"PENDING",userId:req.user._id});
        await odr.save();
        return res.status(201).json({order,key_id:rzp.key_id})
    
    })


    }catch(e){
        
        console.log(e)
        res.status(500).json({message:"something went wrong",error:e});
       
    }
}

exports.updateTranscation = async (req,res) =>{
    try{
       const {payment_id,order_id} = req.body;
      // console.log("pay",payment_id,"order",order_id)
       const order =await Order.findOne({orderid:order_id}).populate("userId");
       //console.log("order",order)
       order.paymentid = payment_id;
       order.status = "SUCESSFULL";
      
       const user = await User.findById(req.user._id);
       //console.log("user",user)
       user.ispremiumuser = true;
        // const promise1 = order.update({paymentid:payment_id,status:"SUCESSFUL"})
        // const promise2 =   req.user.update({ispremiumuser:true});
        const promise1 = order.save();
        const promise2 =   user.save();
        Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({message:"transcation success",token:userController.generateAcessToken(req.user._id,true)})
        }).catch(e=>{
            throw  new Error(e);
        })
                
               
    }catch(e){
        res.status(500).json({message:"something went wrong",error:e});
    }
}