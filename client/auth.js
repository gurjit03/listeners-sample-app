import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { createCustomAPIPath } from './api-path';
import { createAuthRequest } from './fetch-request';
import { setItem } from './localstorage-helpers';

import './login.html';
import './register.html';

Template.login.events({
  'submit .login-form, click .login-form--submit': function(event,tmpl){
    event.preventDefault();
    const loginForm = $(tmpl.find('.login-form'));
    const email = loginForm.find('.email').val();
    const password = loginForm.find('.password').val();
    const apiPath = createCustomAPIPath('login');

    if(!email || !password) {
      alert('Email and password must be defined');
    }else {

      const myLoginRequest = createAuthRequest({email,password});

      fetch(apiPath, myLoginRequest).then((response) => {
        console.log(response);
        if(response.status == 200) {
          return response.json();
        }else {
          alert('check your email or password');
        }
      }).then(response => {
        console.log(response.data,response);
        const { userId, authToken } = response.data;

        // Store the items on session variable
        setItem('token',authToken);
        setItem('userId',userId);

        Meteor.loginWithPassword(email,password,(err,res) => {
          if(err) {
            alert(err.message);
            // Store the items on session variable
            setItem('token',null);
            setItem('userId',null);
          }else {
            FlowRouter.redirect();
          }
        });
      })
      .catch(err => {
        console.error('err',err);
      });

    }
  }
});

Template.register.events({
  'submit .register-form, click .register-form--submit': function(event,tmpl) {
    event.preventDefault();
    const registerForm = $(tmpl.find('.register-form'));
    const username = registerForm.find('.username').val();
    const email = registerForm.find('.email').val();
    const password = registerForm.find('.password').val();
    const apiPath = createCustomAPIPath('users');

    if(!username || !email || !password) {
      alert('All the username, email and password must be defined');
    }else if(password.length < 6) {
      alert('password must be greater than 6 chars');
    }else {

      const mySignupRequest = createAuthRequest({username,email,password});

      fetch(apiPath, mySignupRequest).then((response) => {
        // console.info(response)
        if(response.status == 201) {
          alert('you have successfully signedup, now go to login');
          registerForm.find('.username').val('');
          registerForm.find('.password').val('');
          registerForm.find('.email').val('');
        }
      })
      .catch(err => {
        console.error('err',err);
      });
    }

  }
});
