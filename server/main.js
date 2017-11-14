import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:Restivus';

const connectHandler = WebApp.connectHandlers; // get meteor-core's connect-implementation

Meteor.startup(() => {
  // code to run on server at startup
  connectHandler.use(function (req, res, next) {
    res.setHeader('Strict-Transport-Security', 'max-age=2592000; includeSubDomains'); // 2592000s / 30 days
    return next();
  });
});

export const Api = new Restivus({
  useDefaultAuth: true,
  enableCors: true,
  prettyJson: true,
  user: function() {
    return {
      userId: this.request.headers['x-user-id'],
      token: Accounts._hashLoginToken(this.request.headers['x-auth-token'])
    };
  },
  onLoggedIn: function () {
    console.log(this.user.username + ' (' + this.userId + ') logged in');
  },
  onLoggedOut: function () {
    // console.log(this.user.username + ' (' + this.userId + ') logged out');
  }
});
