const express=require('express');
const router =express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

//Post model
const Post=require('../../models/Post');


//Profile model
const Post=require('../../models/Profile');

//validation
const validatePostInput=require('../../validation/post');



//@route Get api/posts/test
//@desc Tests post routes
//@access Public

router.get('/test',(req,res)=>res.json({msg:"posts works"}));


//@route Get api/posts/
//@desc Get post
//@access Public

    router.get('/',(req,res)=>{
        Post.find()
        .sort({date:-1})
        .then( post=>res.json(post))
        .catch(err=>res.status({nppostfound:'no post found by id'}));
 });


//@route Get api/posts/:id
//@desc Get post by id
//@access Public

router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
    .then( post=>res.json(post))
    .catch(err=>res.status({nppostfound:'no post found by id'}));
});

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




//@route delete api/posts/:id
//@desc delete post
//@access Private
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(post=>{
        Post.findById(req.params.id)
        .then(post=>{
        //check for post
        if(post.user.toString()!==req.user.id){
            return res
            .status(401)
            .json({notauthorised:'user not authorised'});

        }
        //delete
        post.remove().then(()=>res.json({sucess:true}));
    })
    .catch(err=>res.status(404).json({postnotfound:'no post found'}));
})
})



//@route delete api/posts/like/:id
//@desc like post
//@access Private
router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
        .then(post=>{
        //check for post
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res
            .status(400)
            .json({alreadyliked:'user already liked this post'});
        }
            //add user id to like array
            post.likes.unshift({ user:req.user.id});
            post.save().then(post=>res.json(post))
        
    })
    .catch(err=>res.status(404).json({postnotfound:'no post found'}));
})
}
);


//@route delete api/posts/unlike/:id
//@desc unlike post
//@access Private
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
        .then(post=>{
        //check for post
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res
            .status(400)
            .json({notliked:'You have no yet liked this post'});
        }
            //Get the remove index
            const removeindex=post.likes
            .map(item=>itme.user.toString())
            .indexOf(req.user.id);

            //splice out of array
            post.likes.splice(remoceIndex,1);
            //save
            post.save().then(post=>res.json(post));
        
    })
    .catch(err=>res.status(404).json({postnotfound:'no post found'}));
})
}
);
module.exports=router;