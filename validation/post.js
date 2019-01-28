const Validator=require('validator');
const isEmpty = require('./is-empty');

module.exports=function validatePostInput(data){
    let errors={};
    
    data.text=!isEmpty(data.text)?data.text:'';
    
    

   
    if(!Validator.isLength(data.text,{min:10,max:300})){
        errors.text='Post must be minimum  10 and maximum 300';
    }
    if(Validator.isEmpty(data.password)){
        errors.password='password field is required';
    }
    
    return{
        errors,
        isValid:isEmpty(errors)
    }
}