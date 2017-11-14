import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './layout.html';

Template.layout.helpers({
  notLoggedIn: function() {
    return !Meteor.userId();
  }
});
