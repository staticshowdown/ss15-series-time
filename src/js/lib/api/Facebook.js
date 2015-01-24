var Promise = require('bluebird');
var FB = require('fb');

module.exports = {
  friendsFor: function Facebook_friendsFor(id) {
    return new Promise(function(resolve, reject){
      FB.api('/me/friends', function(response){
        console.log(response);
      });
    });
  }
};
