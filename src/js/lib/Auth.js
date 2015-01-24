var config = require('../config');
var Promise = require('bluebird');
var FB = require('fb');

var Auth = {
  permissions: [
    'user_friends',
    'user_likes',
  ],

  user: null,

  logout: function Auth__logout() {
    return new Promise(function(resolve, reject){
      try {
        Auth.user = null;
        FB.logout(function(response){
          resolve();
        });
      } catch (e) {
        // Probably called logout without accessToken error
        resolve();
      }
    });
  },

  login: function Auth__login(provider) {
    if (Auth.user) {
      return Promise.resolve(Auth.user);
    }

    return new Promise(function(resolve, reject){
      FB.login(function(response){
        if (response.authResponse) {
          var data = response.authResponse;
          Auth.user = data;
          return resolve(data);
        }
        return reject(new Error("User cancelled login or did not fully authorize."));
      }, {scope: Auth.permissions.join(',')});
    });
  }
};

module.exports = Auth;
