## Stormpath Passport Strategy Example

This example will show you how to use the Stormpth Passport Strategy with Express

This app will will render a home page with user details, if logged in.  Otherwise it will prompt you to login.

It assumes that you have already created an application in Stormpath and created some user accounts that you can use for login testing.

It was scaffoled with the `express-generator` node module

## To run this examaple

Run the following commands to clone this example and setup your API credentials and App ID:

```
git clone https://github.com/stormpath/passport-stormpath-example.git
cd passport-stormpath-example
npm install
export STORMPATH_API_KEY_ID="YOUR_API_KEY_ID"
export STORMPATH_API_KEY_SECRET="YOUR_API_KEY_SECRET"
export STORMPATH_APP_HREF="https://api.stormpath.com/v1/applications/YOUR_APP_ID"
npm run start
```


Then visit [ http://localhost:3000/ ](http://localhost:3000/)



## Code walk-through


### lib/stormpath.js

This file contains the boilerplate that you need in order to hook up the stormpath strategy with a passport instance.  You can copy this file from our example or implement it yourself.  It does these things:

* Accepts a passport instance

* Creates a Stormpath client that is tied to a Stormpath app, by grabbing your API & App info from the environemt (if you want to use files, see [here](http://docs.stormpath.com/nodejs/api/apiKey))

* Creates the strategy instance and passes it to `passport.use()`

* Defines the `serializeUser` and `deserializeUser` handler functions for the passport instance

---

### app.js

At the top of our app.js we require passport, which returns a passport instance.  We pass that passport instance to the stormpath lib file:

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

* Telling Express to use it's session middleware, this will set a cookie on the client so that the user can remain logged in.

* Telling Express to initialize passport and hook up the session middleware with passport

* Defining a custom middleware which will assign `user` to the local variables for all views, so that we can reference `user` in our views

* **NOTE:** The ordering of these `app.use` statements is important, specifically:
 * `cookieParser` needs to come before `express.session`

 * our custom middleware shoud come before `express.static` and `app.router`

---

We show a login page at `/login` by rendering our login view:

```javascript
app.get('/login', function(req,res){
    res.render('login');
});
```
---

We define a handler for the login page to POST to:

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

* If user is false then there was as problem with the username or password, re-render the login page and pass the error info to the view

* Otherwise, call `req.logIn` to set the user on the seeion and redirect to the home page

---

We define a logout route, using `req.logout()` to clear the user from the session:

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