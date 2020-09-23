
var request = require('request');
var authDbService = require('../dbServices/authService');
var smsApi = require('../../connectors/smsConnector');


exports. sendSMS=function(smsDetails){

    return new Promise( function (resolve,next) {

        console.log('SECOND'+url);
        
        var url=smsApi.URL+'&contacts='+smsDetails.contanct_number.replace('0', '256')+'&message='+smsDetails.message+'&username='+smsApi.USERNAME+'&password='+smsApi.PASSWORD;
   
        console.log(url);
            //    console.log(result);
          

                    request(url, function (error, response, body) {
                        console.log(body);
                      });


                      authDbService.reduceSMSs().then(function(result){
                resolve(result);
        
                }
                
                ).catch(next);


        
 });
  
}

// node services/other_services/smsService/sendSMS({ contanct_number: '0782231039',
//   message:
//    'User successfully resigister, please login using your phone number and paassword just created!! Thanks for saving with EDAD' });