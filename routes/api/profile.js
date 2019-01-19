const express=require('express');

const router=express.Router();


//@route Get api/profile/test
//@desc Tests profile routes
//@access Public

router.get('/test',(req,res)=>res.json({msg:"profile works"}));

module.exports=router;