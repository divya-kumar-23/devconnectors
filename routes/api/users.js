const express=require('express');

const router=express.Router();


//@route Get api/user/test
//@desc Tests user routes
//@access Public

router.get('/test',(req,res)=>res.json({msg:"users works"}));

module.exports=router;