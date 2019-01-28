const express=require('express');
const router =express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

//Post model
const Post=require('../../models/Post')

//validation
const validatePostInput=require('../../validation/post');



//@route Get api/posts/test
//@desc Tests post routes
//@access Public

router.get('/test',(req,res)=>res.json({msg:"posts works"}));


//@route Get api/posts/
//@desc Create post
//@access Private

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{

    //check validation
    if(!isValid){
        //if any error then send 400 with errors
        return res.status(400).json(errors);

    }
    const newPost=new Post({
        text:req.body.text,
        name:req.body.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    });
    newPost.save().then(post=>res.json(post));
})

module.exports=router;