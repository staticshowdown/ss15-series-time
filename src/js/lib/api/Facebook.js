var Promise = require('bluebird');
var FB = require('fb');
var MediasStore = require('../../stores/MediasStore');
var UsersActionCreators = require('../../actions/UsersActionCreators');
var MediasActionCreators = require('../../actions/MediasActionCreators');
var Omdb = require('./Omdb');

var loading = {
  medias: [],
};

var Facebook = {
  initialized: false,

  initialize: function Facebook__initialize(id) {
    if (Facebook.initialized || !id) {
      return;
    }

    Facebook.initialized = true;

    Facebook.friendsFor(id).done(function(response){
      var ids = response.map(function(r){ return r.id; });
      ids.push(id);
      Facebook.videosFor(ids);
    });
  },

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
    var i, l, p = [];

    for (i = 0, l = response.data.length; i < l; i++) {
      var d = response.data[i].data;
      if (!d.tv_show) {
        continue;
      }

      var t = d.tv_show;
      if (loading.medias.indexOf(t.id) !== -1) {
        MediasActionCreators.userToMedia(userId, t.id);
        continue;
      }

      loading.medias.push(t.id);

      p.push(
        new Promise(function(resolve, reject){
          FB.api('/' + t.id, function(response){
            Omdb.search(response.id, response.name).finally(function(){
              resolve();
            }).done(function(omdb){
              MediasActionCreators.set(response, omdb, userId);
            });
          });
        })
      );
    }

    Promise.all(p).then(function(){
      resolve();
    });
  }
}

module.exports = Facebook;
