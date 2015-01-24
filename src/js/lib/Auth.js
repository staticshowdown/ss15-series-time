var config = require('../config');
var Promise = require('bluebird');
var FB = require('fb');

var Auth = {
  providers: {
    facebook: 'Facebook',
  },

  user: null,

  logout: function Auth__logout() {
    return new Promise(function(resolve, reject){
      FB.logout(function(response){
        resolve();
      });
    });
  },

  login: function Auth__login(provider) {
    if (Auth.user) {
      return Promise.resolve(Auth.user);
    }

    if (!Auth.providers[provider]) {
      return Promise.reject(new Error("Invalid provider."));
    }

    return new Promise(function(resolve, reject){
      FB.login(function(response){
        if (response.authResponse) {
          var data = response.authResponse;
          Auth.user = data;
          return resolve(data);
        }
        return reject(new Error("User cancelled login or did not fully authorize."));
      });
    });
  }
};

module.exports = Auth;
