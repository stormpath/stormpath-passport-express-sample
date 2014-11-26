# stormpath-passport-express-sample

A sample Passport + Express application which demonstrates how to successfully use
[passport-stormpath](https://github.com/stormpath/passport-stormpath) to handle
user authentication and authorization for your web app.

[Stormpath](http://stormpath.com/) is a User Management API that reduces development time for any application with scalable user infrastructure. 

**NOTE**: Passport.js is purely for authentication (i.e. checking that someone's username and password is valid, or getting their identity from a social provider). It is not designed for handling user registrations, manage password resets, or implement email verification workflows, etc.  In turn, our Passport strategy only automates authentication. If you need to do more, like password reset, you'll need to also use the [Stormpath Node SDK](https://docs.stormpath.com/nodejs/api/home).

For a more seamless and automated experience, check out our [express-stormpath](https://docs.stormpath.com/nodejs/express/) library instead of Passport.js. It provides a full suite of user management features for your Express-based web application:

* Create, register and authenticate users.
* Store custom user data with each account.
* Create and assign permissions (groups, roles, etc.).
* Handle complex authentication and authorization patterns, like multi-tenancy.
* Log users in via social login with Facebook and Google OAuth.
* Cache user information for quick access.
* Secure all your passwords.

## Links
+ [15-Minute Tutorial: Build a Webapp With Node.js, Express, Passport and Stormpath](https://stormpath.com/blog/build-app-nodejs-express-passport-stormpath/)
+ [passport-stormpath library](https://github.com/stormpath/passport-stormpath)
+ [passport-stormpath documentation](https://docs.stormpath.com/nodejs/passport/)
+ [Stormpath Node.js SDK](https://github.com/stormpath/stormpath-sdk-node)
+ [Stormpath website](http://stormpath.com/)

## Getting Started

To get started, you'll want to first clone this GitHub repository locally:

```bash
$ git clone https://github.com/stormpath/stormpath-passport-express-sample.git
```

Next, you'll want to go into the sample app directory:

```bash
$ cd stormpath-passport-express-sample
```

Then you'll want to run `npm install` to download the dependencies and get
running!

Please read the full output of the `npm install` command -- it will instruct you
to enter your Stormpath API credentials, and explain how to run the project once
you've done so.

If you get stuck during the install process, you can restart it anytime.

That's it!  Get suck?  Just email us anytime:
[support@stormpath.com](mailto:support@stormpath.com)


## Screenshots

Here are some various screenshots of the application (and bootstrap script!), so
you can get an idea of what you're in for :)

![Installing Requirements](https://github.com/stormpath/stormpath-passport-express-sample/raw/master/assets/installing.png)

![Boostrap Script](https://github.com/stormpath/stormpath-passport-express-sample/raw/master/assets/bootstrap.png)

![Running](https://github.com/stormpath/stormpath-passport-express-sample/raw/master/assets/running.png)

![Index Page](https://github.com/stormpath/stormpath-passport-express-sample/raw/master/assets/index-page.png)

![Registration Page](https://github.com/stormpath/stormpath-passport-express-sample/raw/master/assets/registration-page.png)

![Dashboard Page](https://github.com/stormpath/stormpath-passport-express-sample/raw/master/assets/dashboard-page.png)
