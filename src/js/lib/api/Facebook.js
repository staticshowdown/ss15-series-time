var Promise = require('bluebird');
var FB = require('fb');
var MediasStore = require('../../stores/MediasStore');
var UsersActionCreators = require('../../actions/UsersActionCreators');
var MediasActionCreators = require('../../actions/MediasActionCreators');

module.exports = {
  friendsFor: function Facebook__friendsFor(id) {
    return new Promise(function(resolve, reject){
      FB.api('/' + id + '/friends', function(response){
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
  },

  videosFor: function Facebook__videosFor (id) {
    if (id.forEach) {
      var i, l, rs = [];
      for (i = 0, l = id.length; i < l; i++) {
        rs.push(this.videosFor(id[i]));
      }
      return rs;
    }

    return new Promise(function(resolve, reject){
      FB.api('/' + id + '/video.watches', createVideoResponseHandler(resolve, reject, id));
    });
  }
};

function createVideoResponseHandler(resolve, reject, userId) {
  return function(response) {
    if (response.data) {
      MediasActionCreators.set(response.data, userId);
    }

    if (response && response.paging && response.paging.next) {
      FB.api(response.paging.next, createVideoResponseHandler(resolve, reject, userId));
      return;
    }

    resolve();
  }
}
