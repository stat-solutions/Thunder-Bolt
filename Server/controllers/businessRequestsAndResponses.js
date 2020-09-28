var express = require('express');
var request = require('request');
var router = express.Router();
var bodyParser = require('body-parser');
var serviceU = require('../cservices/dbServices/businessDbServices');
var authDbService = require('../cservices/dbServices/authService');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var SMS = require('../cservices/otherServices/smsService');



      
function verifyTokens(req,res,next){

  if(!req.headers.Authorization){
    return res.status(401).send('Unauthorised Request');
  }
  
  let token=req.headers.Authorization.split(' ')[1];
  
  if(token=='null'){
    return res.status(401).send('Unauthorised Request');
  }
  
  let payload=jwt.verify(token,SECRET_KEY);
  
  if(!payload){
    return res.status(401).send('Unauthorised Request');
  }
  
  req.main_contact_number=payload.user_contact;
  
  next();
  
  }





  

module.exports = router;