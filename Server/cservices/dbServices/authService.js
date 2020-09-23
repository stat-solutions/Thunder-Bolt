var dbconnection = require('../../connectors/dbConnector');


exports. theUserExists=function(phone_number,user_role,next){

    return new Promise( function (resolve,next) {

        var sql = "CALL userExists("+"'"+phone_number+"'"+","+"'"+user_role+"'"+")";
        // console.log(sql);
        dbconnection.query(sql, null, function( error, results, fields) {
        if(error){    
            return next(error);
        }else{
          // console.log(results);

          resolve(Boolean(results[0][0].user_exists>0));
        }
        } );});
  
}



exports. testingTData=function(data,next){

  return new Promise( function (resolve,next) {

    

      var sql = "CALL tableTest("+"'"+ JSON.stringify(data) +"'"+")";
      // console.log(sql);
      dbconnection.query(sql, null, function( error, results, fields) {
      if(error){    
          return next(error);
      }else{
        // console.log(results);

        // resolve(Boolean(results[0][0].user_exists>0));
      }
      } );});

}


exports.getDbCredentialsNormalUser = function (phone_number,user_role,next) {
  
    // console.log(phone_number+" ;"+password);
  
    return new Promise( function (resolve,next) {
      dbconnection.query("CALL getNormaUserLogInDetails("+"'"+phone_number+"'"+","+"'"+user_role+"'"+")", null, function( error, results, fields) {
      if(error){    
          return next(error);
      }else{
        // console.log(results[0]);
        resolve(results[0][0]);   
      }});
     
    }
   
      );
}

exports.registerPhoneNumberPassword = function (phone_number,password) {

 
  
    return new Promise( function (resolve,next) {
      // console.log(phone_number+" ;"+password+"Me");
      dbconnection.query("CALL registerPhoneNumberPasswordNormalUsers("+"'"+phone_number+"'"+","+"'"+password+"'"+")", null, function( error, results, fields) {
      if(error){    
          return next(error);
      }else{

        // console.log(results[0][0]);
        
        resolve(results[0][0]);   
      }});
     
    }
   
      );
}



exports.registerTheUser = function (data,phone_number,password) {

 
  
  return new Promise( function (resolve,next) {
    // console.log(phone_number+" ;"+password+"Me");
    dbconnection.query("CALL registerTheUsersDetails("+"'"+JSON.stringify(data)+"'"+","+"'"+phone_number+"'"+","+"'"+password+"'"+")", null, function( error, results, fields) {
    if(error){    
        return next(error);
    }else{

      // console.log(results[0][0]);
      
      resolve(results[0][0]);   
    }});
   
  }
 
    );
}


exports.registerPhoneNumberPasswordAdmin = function (phone_number,password,next) {

  // console.log(phone_number+" ;"+password);

  return new Promise( function (resolve,next) {
    dbconnection.query("CALL registerPhoneNumberPasswordAdmin("+"'"+phone_number+"'"+","+"'"+password+"'"+")", null, function( error, results, fields) {
    if(error){    
        return next(error);
    }else{
      // console.log(results[0][0]);
      resolve(results[0][0]);   
    }});
   
  }
 
    );
}


exports. checkSMSBalance=function(next){

  return new Promise( function (resolve,next) {

      var sql = "CALL getTheNumberOfSMSs()";
      
      dbconnection.query(sql, null, function( error, results, fields) {
      if(error){    
          return next(error);
      }else{
   
   
          //   console.log(results);
         

          resolve(Boolean(results[0][0].number_of_sms>0));
      }
      } );});

}

exports. reduceSMSs=function(){

  return new Promise( function (resolve,next) {

      var sql = "CALL reduceSMSs()";
      
      dbconnection.query(sql, null, function( error, results, fields) {
      if(error){    
          return next(error);
      }else{
   
   
            // console.log(results);
         

          resolve('Done');
      }
      } );});
}

exports. getTheUserRoles=function(){
  return new Promise(function (resolve,next) {
    var sql = "CALL getTheUserRoles()";
    // console.log(sql);
    dbconnection.query(sql, null, function( error, results) {
    if(error){    
        return next(error);
    }else{
      // console.log(results);
       resolve(results[0]);
    }
} );});

  } 
  

  
exports. getTheCompanyPetrolStations=function(){
  return new Promise(function (resolve,next) {
    var sql = "CALL getTheCompanyPetrolStations()";
    // console.log(sql);
    dbconnection.query(sql, null, function( error, results) {
    if(error){    
        return next(error);
    }else{
      // console.log(results);
       resolve(results[0]);
    }
} );});

  } 

  

  
exports.getThePetrolStations = function (company_station, next) {

  return new Promise(function (resolve,next) {

    var sql = "CALL getThePetrolStations(" +"'"+ company_station+"'" + ")";
  // console.log(sql);
  dbconnection.query(sql, null, function (error, results, fields) {
    if (error) {
      return next(error);
    } else {
      // console.log(results[0][0].balance);

      resolve(results[0]);
    }
  });
});

}





exports.getTheWhiteListingStatus = function (contactNumber) {
  // console.log(userId);
    return new Promise(function (resolve,next) {
      // console.log(userId);
      var sql = "CALL theWhiteListExitsHow("+"'"+contactNumber+"'"+")";
    // console.log(sql);
    dbconnection.query(sql, null, function (error, results, fields) {
      if (error) {
        return next(error);
      } else {
          // console.log(results[0]);
       resolve(results[0]);
      }
    });
  });
  
  }



  
exports. getTheActualServicePoints=function(){
  return new Promise(function (resolve,next) {
    var sql = "CALL getTheNowServiceStations()";
    // console.log(sql);
    dbconnection.query(sql, null, function( error, results) {
    if(error){    
        return next(error);
    }else{
      // console.log(results);
       resolve(results[0]);
    }
} );});

  } 
