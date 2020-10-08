var writeFile = require('fs').writeFile;
var argv = require('yargs').argv;
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
var environment = argv.environment;
var isProduction = environment === 'prod';
var targetPath = isProduction
    ? "./src/environments/environment.prod.ts"
    : "./src/environments/environment.ts";
// we have access to our environment variables
// in the process.env object thanks to dotenv
var environmentFileContent = "\nexport const environment = {\n   production: " + isProduction + ",\n   API_URL: \"" + process.env.API_URL + "\",\n   ANOTHER_API_SECRET: \"" + process.env.ANOTHER_API_SECRET + "\"\n};\n";
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Wrote variables to " + targetPath);
});
