
const userModel=require("../models/user-model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {generateToken}=require("../utils/generateToken")


module.exports.registerUser=async(req,res)=>{
   try {
      let {fullName,email,password}=req.body;
      let user=await userModel.findOne({email:email})
      if(user) return res.status(401).send("you already have account")
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
          if(err) return res.send(err.message)
          else{
            let user=await userModel.create({
              fullName,
              email,
              password:hash
            })
            let token=generateToken(user)
            res.cookie("token",token);
            res.send("user created successfully");
          }
        })
      })
      
    } catch (error) {
      console.log(error.message);
    }
}