import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

BlazeLayout.setRoot('body');

function checkLoggedIn(context,redirect) {
  console.log(context,"lasdjfl");
  if(context.route.name !== 'myHomeRoute' && Meteor.userId()) {
     redirect('/');
  }
}

FlowRouter.route('/',{
  name: 'myHomeRoute',
  action: function(params,queryParams) {
    BlazeLayout.render('layout', {content: 'login'});
  },
  triggersEnter: [checkLoggedIn]
});

FlowRouter.route('/sign-up',{
  action: function(params,queryParams) {
    BlazeLayout.render('layout', {content: 'register'});
  },
  triggersEnter: [checkLoggedIn]
});

FlowRouter.route('/login',{
  action: function(params,queryParams) {
    BlazeLayout.render('layout', {content: 'login'});
  },
  triggersEnter: [checkLoggedIn]
});
