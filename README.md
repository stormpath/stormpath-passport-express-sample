# Stormpath Express Sample #

[Stormpath](http://stormpath.com/) is a User Management API that reduces development time with instant-on, scalable user infrastructure. Stormpath's intuitive API and expert support make it easy for developers to authenticate, manage, and secure users and roles in any application.

This sample will show you how to authenticate a Stormpath account within an Express app.  It assumes that you have already created an application in Stormpath and have created some user accounts that you can use for login testing.

### Links
+ [Node.js Quickstart Guide](http://docs.stormpath.com/nodejs/api/home#quickstart) - Get started with Stormpath in an hour!
+ [Node.js Product Guide](http://docs.stormpath.com/nodejs/api/home) - In depth product documnetation for Stormpath's Node.js SDK
+ [Stormpath's site](http://stormpath.com/)
+ [Stormpath Support](https://support.stormpath.com/home)

### Build Instructions ###

Run the following commands in your terminal to clone this sample, setup your credentials, and run the Express app:

```
git clone https://github.com/stormpath/passport-stormpath-example.git
cd passport-stormpath-example
npm install
export STORMPATH_API_KEY_ID="YOUR_API_KEY_ID"
export STORMPATH_API_KEY_SECRET="YOUR_API_KEY_SECRET"
export STORMPATH_APP_HREF="https://api.stormpath.com/v1/applications/YOUR_APP_ID"
npm run start
```

Then visit [ http://localhost:3000/ ](http://localhost:3000/) in your web browser.

**Security tip**:  we recommend storing your API credintials in a keyfile, please see the [ApiKey documentation](http://docs.stormpath.com/nodejs/api/apiKey) for instructions.

### Contributing

You can make your own contributions by forking the <code>development</code> branch, making your changes, and issuing pull-requests on the <code>development</code> branch.

We regularly maintain our GitHub repostiory, and are quick about reviewing pull requests and accepting changes!

### Copyright ###

Copyright &copy; 2013 Stormpath, Inc. and contributors.

This project is open-source via the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0).