//
// This script makes setting up this sample Stormpath app very easy.
// It reads in all the necessary Stormpath configs, and generates the
// appropriate environment variables.


var crypto = require('crypto');
var fs = require('fs');
var readline = require('readline');
var stormpath = require('stormpath');


console.log('Hi, and welcome to the stormpath-express-sample bootstrap app!\n');
console.log(
  "I'll help get you up and running in no time!  If you don't already have a\n" +
  "Stormpath account, please create one: https://api.stormpath.com/register\n"
);
console.log(
  "Once you've made an account, be sure to create an API keypair in your\n" +
  "dashboard, and download your credentials.  You'll need these to continue.\n"
);

var api_key_id, api_key_secret = undefined;
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('To get started, please enter your Stormpath API Key ID: ', function (answer) {
  api_key_id = answer.trim();

  rl.question('Please enter your Stormpath API Key Secret: ', function (answer) {
    api_key_secret = answer.trim();
    rl.close()

    createVariables();
    prompts();
  });
});


function createVariables() {
  var apiKey = new stormpath.ApiKey(api_key_id, api_key_secret);
  var client = new stormpath.Client({apiKey: apiKey});

  client.createApplication(
    {
      'name': 'stormpath-express-sample',
      'description': 'A sample application required to run the stormpath-express-sample application!  Feel free to delete this!',
    },
    { createDirectory: true },
    function (err, app) {
      if (!err) write(app);
    }
  );

  client.getApplications(function(err, apps) {
    if (err) throw err;

    apps.each(function(app, next) {
      if (app.name === 'stormpath-express-sample') {
        write(app);
      }else{
        next();
      }
    });

  });
}


function write(app) {
  crypto.randomBytes(40, function(ex, buf) {
    var secret = buf.toString('hex');
    fs.writeFile(
      '.env',
      'export STORMPATH_API_KEY_ID=' + api_key_id + '\n' +
      'export STORMPATH_API_KEY_SECRET=' + api_key_secret + '\n' +
      'export STORMPATH_APP_HREF=' + app.href + '\n' +
      'export EXPRESS_SECRET=' + secret + '\n'
    );
  });
}


function prompts() {
  console.log("\nI've just created a new file in this directory named .env");
  console.log(
    "\nThis file contains all of the necessary environment variables to make this\n" +
    "sample application run!\n"
  );
  console.log(
    "Now that we've completed all bootstrapping stuff, all you need to do to get\n" +
    "your sample application running is to execute the following commands:\n"
  );
  console.log("\t$ source .env");
  console.log("\t$ npm start\n");
  console.log(
    "You should then be able to visit 'http://localhost:3000' in your browser to" +
    "play around with the sample application!\n"
  );
  console.log("Have questions?  Email us!  support@stormpath.com\n");
}
