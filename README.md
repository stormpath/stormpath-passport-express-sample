## Stormpath Passport Strategy Example

This example will show you how to use the Stormpth Passport Strategy with Express

This app will will render a home page with user details, if logged in.  Otherwise it will prompt you to login.

It was scaffoled with the `express-generator` node module

## To run this examaple

Execute the following commands to clone this example and setup your API credentials and App ID:

```
git clone <<URL>>
cd <<URL>>
npm install
echo "apiKey.id = YOUR_API_KEY" > ~/.stormpath/apiKey.properties
echo "apiKey.secret = YOUR_API_SECRET" >> ~/.stormpath/apiKey.properties
export SP_APP_HREF="https://api.stormpath.com/v1/applications/YOUR_APP_ID"
npm run start
```


Then visit http://localhost:3000/



## Code walk-through


### lib/stormpath.js

This file is the "glue" between your Stormpath SDK client, the Stormpath passport strategy, and the global passport state.  You can copy this file from our example or implement it yourself.  Here is what our version is doing:

* Requiring the Stormpath node SDK

* Setting up a Stormpath client, using your API key and Application Href.
 * Our example will read your API key from your home directory, and the app href from ENV - you can change this if needed

* Initializing an instance of the `passport-stormpath` strategy, and telling passport to use it via `passport.use()`

* Telling passport how to serialize/deserialze the Stormpath user data

---

### app.js

At the top of our app.js, we require passport.  Then we pass it into the stormpath initialization function:

```
var passport = require('passport');

require('./lib/stormpath')(passport);
```

Next we configure the necessary middleware in Express:

```javascript
app.use(cookieParser());
app.use(express.session({ secret:  process.env.EXPRESS_SECRET || "//TODO" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) { // custom middleware
  res.locals.user = req.user;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
```

Here we are:

* Telling express to use it's session middleware, this will set a cookie on the client so that we can remain logged in once we submit valid credentials

* Telling express to initialize passport and hook up the session middleware with passport

* Setting up a custom middleware which will assign `user` to the local variables for all views, so that we can reference in all our templates - yay!

* **NOTE:** The ordering of these `app.use` statements is important, specifically:
 * `cookieParser` needs to come before `express.session`

 * our custom middleware shoud come before `express.static` and `app.router`

Please see the Express docs for more info, or reach our for help!

We want to render a login page at `/login` by rendering our login view:

```javascript
app.get('/login', function(req,res){
    res.render('login');
});
```
---

We setup a POST handler for the login page to post to:

```javascript
app.post('/login', function(req, res, next) {
    passport.authenticate('stormpath', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user && info) {
            return res.render('login',{
                error:info,
                username: req.body.username
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

```

It handles the following cases:

* If a major error (e.g. network error) then pass on the error, to eventually be rendered by Express

* If user is false then there was as problem with the username or password, re-render the login page and pass that info to the view

* Otherwise, login and redirect to the home page if no other errors

---

We also provide a logout route, this uses `req.logout()` from express:

```javascript
app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
});
```

## Need more help?

* Passport Guide: http://passportjs.org/guide/

* Express Guide: http://expressjs.com/guide.html

* Stormpath Node SDK Docs: http://docs.stormpath.com/nodejs/api/home

* Stormpath API Docs: http://docs.stormpath.com/rest/product-guide/

* Stormpath Support: https://support.stormpath.com/home