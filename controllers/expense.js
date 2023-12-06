const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../utils/database")



exports.postAddExpense = async (req,res) =>{
   
    try{
        
       const {amount,descripiton,category} = req.body;
       
           const data =   new Expense({amount:amount,descripiton:descripiton,category:category,userId:req.user._id});
          
           //console.log("user",req.user)
           await data.save();
           const totalExpense = Number(req.user.totalexpense) + Number(data.amount);
           const user = await User.findById(req.user._id)
           user.totalexpense = totalExpense;
           await user.save()
          // console.log("one user",user)
         
            res.status(201).json({newExpense:data});
      
        
            
       


    }catch(e){
       
        res.status(500).json({error:e});
    }
}
exports.getExpense = async (req,res)=>{
    try{
        
        const ITEM_PER_PAGE = Number(req.query.limit);
        const page =Number(req.query.page);
       
        let totalItems = await Expense.countDocuments({userId:req.user._id});
        
    
           
      let data = await Expense.find({userId:req.user._id})
        .populate("userId")
        .skip((page-1)*ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE)
      
        
        

       //const data = await Expense.findAll();
       res.status(200).json({allExpense:data,
        pageData:{currentPage: page,
            hasNextPage: ITEM_PER_PAGE * page < totalItems,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),}
    })

    }catch(e){
        console.log(e)
        res.status(500).json({err:e});
    }
}

exports.deleteExpense = async (req,res)=>{
   
    try{
   
     const id = req.params.id;
    
     let exp = await Expense.findById(id);
    
     const totalExpense = Number(req.user.totalexpense) - Number(exp.amount);

     const user = await User.findById(req.user._id)
    
      user.totalexpense = totalExpense;
      await user.save()

     
    
    await Expense.findByIdAndDelete(id);
     
     res.status(200).json({ success: true, message: "DELETED" });

    }catch(e){
        console.log(e)
        
        res.status(500).json({err:e});
    }
}