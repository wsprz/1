var express=require('express');
var router=express.Router();
router.get('/',function(req,res,next){
    res.render('./feedback/success',{msg:req.query.msg});
});
module.exports=router;