import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';

import { Listeners } from '../../imports/collections/listeners';
import { Api } from '../main.js';

// Api.addCollection(Listeners);

// Path api/addListener
Api.addRoute('add-listener', {authRequired: true}, {
  post: function() {
    console.log('never reachign..');
    const userId = this.userId;
    const user = Meteor.users.findOne(this.userId);
    console.log(this.userId,user,"user...");

    // Add this user to the Listeners
    try{
      const listenerAdded = Listeners.insert({ user: user, addedAt: new Date() });
    }
    catch(e) {
      console.log(e);
      return {
        statusCode: 500,
        message: e.message
      }
    }

    return {
      statusCode: 201,
      message: "Listener added successfully"
    }
  }
});

Api.addRoute('/showListeners',{authRequired: true}, {
  get: function() {
    try{
      const allListeners = Listeners.find({}).fetch();
    }catch(e) {
      console.log(e);
      return {
        statusCode: 500,
        message: e.message
      }
    };

    return {
      statusCode: 201,
      data: allListeners,
      message: "Listener found successfully"
    }
  }
});
