var express=require('express');
var router=express.Router();

var mgdb=require('../..//common/mgdb');
router.get('/',function(req,res,next){
    res.render('login',{});
});
router.post('/submit',(req,res,next)=>{
    // console.log("hahahha");
    // console.log(req.body)
    let{username,password}=req.body;
    mgdb(
        {collection:'super'},
        ({collection,client})=>{
            collection.find(
                {username,password},{
                    projection:{_id:0}
                }
            ).toArray((err,result)=>{
                if(!err&&result.length>0){
                    // console.log(req.session)
                    req.session['username']=result[0].username;
                    req.session['icon']=result[0].icon;
                    console.log(result[0].icon)
                    res.redirect('/admin/home');
                    // res.redirect('/admin/success?msg=登录成功');
                }else{
                    res.redirect('/admin/error?msg=登录失败');
                }
            })
        }
        )
});
module.exports=router;


