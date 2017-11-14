import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

BlazeLayout.setRoot('body');

FlowRouter.route('/',{
  action: function(params,queryParams) {
    BlazeLayout.render('layout', {content: 'login'});
  }
});

FlowRouter.route('/sign-up',{
  action: function(params,queryParams) {
    BlazeLayout.render('layout', {content: 'register'});
  }
});

FlowRouter.route('/login',{
  action: function(params,queryParams) {
    BlazeLayout.render('layout', {content: 'login'});
  }
});
