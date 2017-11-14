import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';

import { Listeners } from '../../imports/collections/listeners';
import { Api } from '../main.js';

Api.addCollection(Listeners,{
  authRequired: true,
});

// Path api/addListener
Api.addRoute('/addListener',{authRequired: true},{
  post: function() {
    const userId = this.userId;
    const user = Meteor.users(this.userId);

    // Add this user to the Listeners
    try{
      const listenerAdded = Listeners.insert({
        user: user,
        addedAt: new Date(),
      });
    }catch(e => {
      console.log(e);
      return {
        statusCode: 500,
        message: e.message
      }
    };

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
    }catch(e => {
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
