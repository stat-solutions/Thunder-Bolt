
   const mailgun = require("mailgun-js");
   const DOMAIN = "statsolutionsnetwork.com";
   const mg = mailgun({apiKey: "f7ce501182126bb98a30849225ee2419-9949a98f-3571aaa0", domain: DOMAIN});

module.exports = mg;


