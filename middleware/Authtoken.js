const jwt = require('jsonwebtoken')
module.exports= function (req,res,next) {

let tokens = req.header('Authorization')

try{
 var splitToken='Bearer ';
 const token= tokens.split(`${splitToken}`)[1]
 if(token==undefined){
  res.status(401).json({Error:'الوصول مرفوض تاكد من ارسال التوكن'})
  return false;
}else
if(!token)
return res.status(401).json({Error:'الوصول مرفوض تاكد من ارسال التوكن'})/* ا  (401)===>المقصد منه ان اليوزر غير مرخص */
 
const decodeToken=jwt.verify(token, process.env.JWT_SECRET);
req.userProf=decodeToken;
next();
}catch(e){
return res.status(400).json({Error:'... رمز التوكن خاطئ'})
}}