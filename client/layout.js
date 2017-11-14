import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { createPOSTRequestObj } from './fetch-request';
import { createCustomAPIPath } from './api-path';
import { setItem } from './localstorage-helpers';

import './layout.html';
import './home.html';

// LAYOUT TEMPLATES..
Template.layout.onCreated(function() {
  this.autorun(() => {
    this.subscribe('allUsers');
  });
});

Template.layout.helpers({
  notLoggedIn: function() {
    console.log(Meteor.user(),Meteor.userId());
    return !Meteor.userId();
  },
  currentUser: function() {
    console.log(Meteor.user(),Meteor.userId());
    return Meteor.userId();
  }
});

// HOME TEMPLATES..
Template.home.events({
  'click .logout': function(event,tmpl) {
      const apiPath = createCustomAPIPath('logout');
      fetch(apiPath, createPOSTRequestObj()).then(response => {
        if(response.status === 200 || response.status === 201) {
          console.log(response)
          return response.json();
        }
      }).then(response => {
        console.log(response)
        if(response.status === 'success') {
          // Remove the token from the actuall data..
          setItem('token',null);
          setItem('userId',null);

          // Then logout of the system.
          Meteor.logout();
        }
      }).catch(e => {

      });
  }
});
