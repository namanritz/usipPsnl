const jwt = require('jsonwebtoken');

module.exports.auth = async (req,res,next)=>{
    //console.log(req.params);
    const { id }=req.params;
    const cookies = await req.cookies;
    //console.log(cookies);
    if(!cookies.token){
        
        return res.redirect('/student/login');
    }
    const response = await jwt.verify(cookies.token,"thisisasecretkeyhelloonetwothreefour");
    
        //console.log(response._id);
       // console.log(id);
    
     if(response._id!=id){
        req.flash("error","Please Login again")
        //console.log("token not matched");
        return res.redirect('/');
     }
    next();
     
}

