var stormpath = require('stormpath');
var StormpathStrategy = require('passport-stormpath');

var homeDir = process.env[(process.platform === 'win32' ? 'USERPROFILE' : 'HOME')],
    apiKeyFilePath = homeDir + '/.stormpath/apiKey.properties',
    appHref = process.env.SP_APP_HREF;

var spClient;

module.exports = function(passport){
    
    stormpath.loadApiKey(apiKeyFilePath, function apiKeyFileLoaded(err, apiKey) {
        if (err){
            throw err;
        }else {
            spClient = new stormpath.Client({apiKey: apiKey});
            spClient.getApplication(appHref,function(err,app){
                if(err){
                    throw err;
                }
                passport.use(new StormpathStrategy({spApp:app}));
            });
        }
    });

    passport.serializeUser(function(user, done) {
        done(null, user.href);
    });

    passport.deserializeUser(function(userHref, done) {
        spClient.getAccount(userHref,function(err,account){
            done(err,account);
        });
    });
};


