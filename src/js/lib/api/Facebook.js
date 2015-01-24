var Promise = require('bluebird');
var FB = require('fb');

module.exports = {
  friendsFor: function Facebook_friendsFor(id) {
    return new Promise(function(resolve, reject){
      FB.api('/me/friends', function(response){
        FB.api('/me/television', function(){ console.log({me: JSON.stringify(arguments)}); });
        FB.api('/' + response.data[0].id + '/television', function(){ console.log({dynamic_friend: JSON.stringify(arguments)}); });
        // Tadeu Zagallo
        FB.api('/657352711010730/television', function(){ console.log({static_friend: JSON.stringify(arguments)}); });
      });
    });
  }
};
