var express = require('express');
var router = express.Router();
var request = require('request');
var SMS = require('../cservices/otherServices/smsService');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcrypt'); 
const randtoken = require('rand-token');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var bodyParser = require('body-parser');
const saltRounds=14;
const CRYPITOL_KEY = "secretkey23456";
var authDbService = require('../cservices/dbServices/authService');
var veri=require('../connectors/verify');
const refreshTokens = {};


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



  
router.use(bodyParser.urlencoded({ extended: false }));

router.use(bodyParser.json());



router.get('/getUserRoles', function(req, res,next) {
   
  authDbService.getTheUserRoles().then( function(results) {
    res.setHeader('Content-Type', 'application/json');
    res.json(results);

    
  }
  
  ).catch(next);
  
  });

  router.get('/getTheServicePoints', function(req, res,next) {
   
    authDbService.getTheActualServicePoints().then( function(results) {
      res.setHeader('Content-Type', 'application/json');
      res.json(results);
  
      
    }
    
    ).catch(next);
    
    });

   

  router.get("/testTheWhiteListed", function(req, res, next) {
    // console.log(req.query.id);
    authDbService
      .getTheWhiteListingStatus(req.query.id)
      .then(function(results) {
        res.setHeader("Content-Type", "application/json");
        res.json(results);
      })
      .catch(next);
  });





  router.get('/getCompanyPetrolStations', function(req, res,next) {
   
    authDbService.getTheCompanyPetrolStations().then( function(results) {
      res.setHeader('Content-Type', 'application/json');
      res.json(results);
  
      
    }
    
    ).catch(next);
    
    });


     
router.get('/allThePetrolStations', function(req, res,next) {

  authDbService.getThePetrolStations(req.query.id,next).then( function(results) {
    res.setHeader('Content-Type', 'application/json');
    res.json(results);
  }
  
  ).catch(next);

 } );
  
router.post('/login', function(req, res,next) {

  authDbService.theUserExists(req.body.main_contact_number,req.body.user_role11,next).then( function(results1){
console.log(results1);
 if(results1){

  authDbService.getDbCredentialsNormalUser(req.body.main_contact_number,req.body.user_role11,next).then(function(results) {

    if(bcrypt.compareSync(req.body.password, results.users_password)){

      let payload=null;
     
      if(req.body.contact_white_liested){
        
        payload = {
          "user_id": results.users_id,
          "user_contact": results.users_name,
          "user_role": results. fk_user_role_id_users,
          "user_station": req.body.service_points_id,
          "user_status": results. users_active_status,
          "user_name": results. name,
          "user_station_name": req.body.service_points,
          "user_station_company": results. petrol_station_company_name,
          "white_listed": true
        }


      }else{

        payload = {
          "user_id": results.users_id,
          "user_contact": results.users_name,
          "user_role": results. fk_user_role_id_users,
          "user_station": results.fk_petrol_station_id_users,
          "user_status": results. users_active_status,
          "user_name": results. name,
          "user_station_name": results.petrol_station_name,
          "user_station_company": results. petrol_station_company_name,
          "white_listed": false
        }

      }
    
   const token = jwt.sign(payload, CRYPITOL_KEY, {expiresIn: 10000});
   const refreshToken = randtoken.uid(256);
   refreshTokens[refreshToken] = results.user_name;
   res.json({jwt: token, refreshToken: refreshToken});

    }else{

      res.status(405).json('Invalid phone number or password');
   
    }
   
  

     
   }
   
   ).catch(next);

 }else{

  res.status(407).json('User Not Registered');

 }
  
}

).catch(next);

});


router.post('/testTableData', function(req, res,next) {

  console.log(JSON.stringify(req.body));
  authDbService.registerPhoneNumberPassword(req.body).then( function(results) {


    res.json('Received');
  })
 


});



router.post('/register', function(req, res,next) {
   
    const  main_contact_number  =  req.body.main_contact_number;
  
      const  password  = bcrypt.hashSync(req.body.password, saltRounds);
       
      const refreshToken = randtoken.uid(256);

      authDbService.theUserExists(req.body.main_contact_number,req.body.user_role, next).then( function(results1){
        // console.log(results1);
         if(results1){
  
          res.status(401).json('User mobile number already exists!!!');
  
         }else{

          
          authDbService.registerTheUser(req.body,main_contact_number,password,refreshToken,next).then( function(results) {
  
// console.log('before'+results.users_id);

            const payload = {
              "user_id": results.users_id,
              "user_contact":results.users_name,
              "user_role": results.fk_user_role_id_users
            }

const sms={
  'contanct_number':results.users_name,
  'message':'Welcome to MAFUTA GAFFE APP!!. You have successfully registered. Please contact manager for approval and then login!!'
  
}


authDbService.checkSMSBalance(next).then(function(result){

  if(result){


    // console.log('First'+' '+sms);
    
    SMS.sendSMS(sms,next);
  }

}).catch(next);


            const token = jwt.sign(payload, CRYPITOL_KEY, { expiresIn: 600 })

  res.json({jwt: token, refreshToken: refreshToken});
            
          }
          
          ).catch(next);
       
  
         }
      }).catch(next);;
  
  
  
  
  });  
  router.post('/registerAdmin', function(req, res,next) {
   
    const  main_contact_number  =  req.body.main_contact_number;
  
      const  password  = bcrypt.hashSync(req.body.password, saltRounds);
       
      const refreshToken = randtoken.uid(256);

      authDbService.theUserExists(req.body.main_contact_number,next).then( function(results1){
        // console.log(results1);
         if(results1){
  
          res.status(401).json('User mobile number already exists!!!');
  
         }else{

          
          authDbService.registerPhoneNumberPasswordAdmin(main_contact_number,password,refreshToken,next).then( function(results) {
  
            const payload = {
              "user_id": results.user_id,
              "user_contact":results.user_name,
              "user_role": results.fk_users_roles_id_users
            }

            const token = jwt.sign(payload, CRYPITOL_KEY, { expiresIn: 600 })

  res.json({jwt: token, refreshToken: refreshToken});
            
          }
          
          ).catch(next);
       
  
         }
      }).catch(next);;
  
  
  
  
  });  
  router.post('/logout', function (req, res) { 
    const refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens) { 
      delete refreshTokens[refreshToken];
    } 
    res.sendStatus(204); 
  });
  
  router.post('/refresh', function (req, res) {
      const refreshToken = req.body.refreshToken;
      
  
      if (refreshToken in refreshTokens) {
        const payload = {
              "user_id": results.user_id,
              "user_contact":results.user_name,
              "user_role": results.fk_users_roles_id_users
            }
        const token = jwt.sign(payload, CRYPITOL_KEY, { expiresIn: 600 });
        res.json({jwt: token})
      }
      else {
        res.sendStatus(401);
      }
  });


module.exports = router;













