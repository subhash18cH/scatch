const express=require("express");
const router=express.Router();
const ownerModel=require("../models/owner-model")

if(process.env.NODE_ENV==="development"){
  router.post("/create",async(req,res)=>{
    let owners=await ownerModel.find();
    if(owners.length>0){
      return res.status(503).send("You cant create a owner");
    }
    let {fullName,email,password}=req.body;
  
    let createdOwner=await ownerModel.create({
      fullName,
      email,
      password
  
    });
    res.status(200).send(createdOwner)
  })
}

router.get("/",(req,res)=>{
  res.send("hey")
})

module.exports=router;