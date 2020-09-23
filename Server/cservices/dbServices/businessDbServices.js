var request = require('request');
var dbconnection = require('../../connectors/dbConnector');




exports.updateClient = function (data) {

  return new Promise(function (resolve,next) {

    var sql = "CALL updateCustomerDetails("+"'"+JSON.stringify(data)+"'"+")";
  console.log(sql);
  dbconnection.query(sql, null, function (error, results, fields) {
    if (error) {
      return next(error);
    } else {

      // console.log(results[0]);

     resolve(results[0]);
    }
  });
}); }













exports.saveCustomerDetails = function (data) {

    return new Promise(function (resolve,next) {
  
      var sql = "CALL saveCustomerDetails("+"'"+JSON.stringify(data)+"'"+")";
    console.log(sql);
    dbconnection.query(sql, null, function (error, results, fields) {
      if (error) {
        return next(error);
      } else {
  
        // console.log(results[0]);
  
       resolve(results[0]);
      }
    });
  }); }
  

  
exports.saveStageDetails = function (data) {

  return new Promise(function (resolve,next) {

    var sql = "CALL saveStageDetails("+"'"+JSON.stringify(data)+"'"+")";
  // console.log(sql);
  dbconnection.query(sql, null, function (error, results, fields) {
    if (error) {
      return next(error);
    } else {

      // console.log(results[0]);

     resolve(results[0]);
    }
  });
}); }



exports.waiveTheInterestNowNow = function (data) {

  return new Promise(function (resolve,next) {

    var sql = "CALL waiveInterstIncome("+"'"+JSON.stringify(data)+"'"+")";
  console.log(sql);
  dbconnection.query(sql, null, function (error, results, fields) {
    if (error) {
      return next(error);
    } else {

      // console.log(results[0]);

     resolve(results[0]);
    }
  });
}); }

exports.getAllLoansDetailsNow = function () {

  return new Promise(function (resolve,next) {

    var sql = "CALL getAllLoansDetailsNow()";
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




exports.getcustomerPayStatemntNow = function (numberPlate) {
  // console.log(userId);
    return new Promise(function (resolve,next) {
      // console.log(userId);
      var sql = "CALL individualLoanStatment("+"'"+numberPlate+"'"+")";
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


exports.theOutStandingInt = function (numberPlate) {
  // console.log(userId);
    return new Promise(function (resolve,next) {
      // console.log(userId);
      var sql = "CALL theOutstandInterestNowX("+"'"+numberPlate+"'"+")";
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


exports.getAllTheClientsDetails = function (stationId) {
  // console.log(userId);
    return new Promise(function (resolve,next) {
      // console.log(userId);
      var sql = "CALL allClients("+"'"+stationId+"'"+")";
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
  


exports.getTheStageNames = function (userId) {
  // console.log(userId);
    return new Promise(function (resolve,next) {
      // console.log(userId);
      var sql = "CALL getTheStageNames("+"'"+userId+"'"+")";
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
  
  

  exports.chairmanContactAlreadyExists = function (theNumberContact) {

    return new Promise(function (resolve,next) {
  
      var sql = "CALL chairmanContactAlreadyExists("+"'"+theNumberContact+"'"+")";
    // console.log(sql);
    dbconnection.query(sql, null, function (error, results, fields) {
      if (error) {
        return next(error);
      } else {
          // console.log(results[0]);
          resolve(Boolean(results[0][0].number_contact_exists>0));
      }
    });
  });
  
  }

  exports.numberPlateAlreadyExists = function (theNumberPlate) {

    return new Promise(function (resolve,next) {
  
      var sql = "CALL numberPlateAlreadyExists("+"'"+theNumberPlate+"'"+")";
    // console.log(sql);
    dbconnection.query(sql, null, function (error, results, fields) {
      if (error) {
        return next(error);
      } else {
          // console.log(results[0]);
          resolve(Boolean(results[0][0].number_plate_exists>0));
      }
    });
  });
  
  }