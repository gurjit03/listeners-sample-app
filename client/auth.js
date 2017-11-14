import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { createCustomAPIPath } from './imports/api-path';
import {createPOSTrequest , createGETrequest} from './fetch-request.js';

import './login.html';
import './register.html';

Template.login.events({
  'submit .login-form, click .login-form--submit': function(event,tmpl){
    const loginForm = $(tmpl.find('.login-form'));
    const username = loginForm.find('.username').val();
    const password = loginForm.find('.password').val();
    const apiPath = createCustomAPIPath('login');

    if(!username || !password) {
      alert('Username and password must be defined');
    }else {

      const myLoginRequest = createPOSTrequest({username,email,password});

      fetch(apiPath, myLoginRequest).then((response) => {
        console.info(response)
        return response.json();
      }).then(res => {
        console.info(res);
      })
      .catch(err => {
        console.error('err',err);
      });

    }
  }
});

Template.register.events({
  'submit .register-form, click .register-form--submit': function(event,tmpl) {
    const registerForm = $(tmpl.find('.register-form'));
    const username = registerForm.find('.username').val();
    const email = registerForm.find('.email').val();
    const password = registerForm.find('.password').val();
    const apiPath = createCustomAPIPath('sign-up');

    if(!username || !email || !password) {
      alert('All the username, email and password must be defined');
    }else if(password.length < 6) {
      alert('password must be greater than 6 chars');
    }else {

      const mySignupRequest = createPOSTrequest({username,email,password});

      fetch(apiPath, mySignupRequest).then((response) => {
        console.info(response)
        return response.json();
      }).then(res => {
        console.info(res);
      })
      .catch(err => {
        console.error('err',err);
      });
    }

  }
});
