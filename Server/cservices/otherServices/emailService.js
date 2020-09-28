var mg = require('../../connectors/emailConnector');


exports.sendEmailService = function (emailDetails,next) {

  return new Promise(function(resolve) {

    mg.messages().send(emailDetails, function(err, info) {
            if (err) {
                next(err);
            } else {
              resolve("Sent!!");
            }
        });

 
});}


