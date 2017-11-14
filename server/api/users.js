import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';

import { Api } from '../main.js';

Api.addCollection(Meteor.users,{
  authRequired: true,
  excludedEndpoints: ['getAll','delete','put']
});
