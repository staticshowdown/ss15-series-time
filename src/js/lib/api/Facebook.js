var Promise = require('bluebird');
var FB = require('fb');
var UsersActionCreators = require('../../actions/UsersActionCreators.js');

module.exports = {
  friendsFor: function Facebook_friendsFor(id) {
    return new Promise(function(resolve, reject){
      FB.api('/me/friends', function(response){
        if (response.data) {
          var i, l;
          var friends = [];
          for (i = 0, l = response.data.length; i < l; i++) {
            var friend = response.data[i];
            friends.push(friend);
          }
          UsersActionCreators.info(friends);
          return resolve(friends);
        }

        return reject(new Error("Can't load friends."));
      });
    });
  }
};
