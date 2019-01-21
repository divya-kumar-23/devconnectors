const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

//load Profile Modal
const Profile=require('../../models/Profile');

//Load User Profile

const User =require('../../models/User');


//@route Get api/profile/test
//@desc Tests profile routes
//@access Public

router.get('/test',(req,res)=>res.json({msg:"profile works"}));


//@route Get api/profile
//@desc Get current user profile
//@access Private
router.get('/', passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors={};
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        if(!profile){
            errors.npoprofile='there is no profile for this user';
            return res.sendStatus(404).json();
        }
        res.json(profile);
    })
    .catch(err=>res.status(404).json(err));
})

module.exports=router;