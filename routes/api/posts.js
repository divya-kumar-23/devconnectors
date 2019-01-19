const express=require('express');

const router=express.Router();

//@route Get api/posts/test
//@desc Tests post routes
//@access Public

router.get('/test',(req,res)=>res.json({msg:"posts works"}));

module.exports=router;