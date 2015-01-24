var config = require('../config');
var Firebase = require('firebase');
var Promise = require('bluebird');
var UsersActionCreators = require('../actions/UsersActionCreators');
var UsersStore = require('../stores/UsersStore');

var ref = new Firebase(config.firebaseUrl);

var Auth = {
  providers: {
    facebook: 'Facebook',
  },

  user: null,

  logout: function Auth__logout() {
    ref.unauth();
    Auth.user = null;
    UsersActionCreators.auth(null);
  },

  login: function Auth__login(provider) {
    if (Auth.user) {
      return Promise.resolve(Auth.user);
    }

    if (!Auth.providers[provider]) {
      return Promise.reject(new Error("Invalid provider."));
    }

    return new Promise(function(resolve, reject){
      var transports = [
        'authWithOAuthPopup',
        'authWithOAuthRedirect',
      ];

      doAuth(transports.shift());

      function doAuth(transport) {
        ref[transport](provider, function(err, data){
          if (err) {
            if (err.code === 'TRANSPORT_UNAVAILABLE' && transports.length > 0) {
              doAuth(transports.shift());
              return;
            }

            return reject(err);
          }

          if (data) {
            ref.child("users").child(data.uid).set(data);
            Auth.user = data;
            UsersActionCreators.auth(data);
            return resolve(data);
          }

          return reject(new Error("No user data."));
        });
      }
    });
  }
};

ref.onAuth(function(data){
  Auth.user = data;
});

module.exports = Auth;
