var Marty = require('marty');
var MediasConstants = require('../constants/MediasConstants');
var MediasActionCreators = require('../actions/MediasActionCreators');
var Auth = require('../lib/Auth');

var MediasStore = Marty.createStore({
  handlers: {
    setMedias: MediasConstants.SET,
    addUserToMedia: MediasConstants.USERTOMEDIA
  },

  getInitialState: function MediasStore__getInitialState() {
    return {
      medias: {},
      userMediaMap: {},
    };
  },

  getForUser: function MediasStore__getForUser(userId, inverted) {
    var rs, i, l, u = this.state.userMediaMap[userId];

    if (u && u.map) {
      var t = this;
      if (inverted) {
        rs = this.getMedias().filter(function(m){
          return u.indexOf(m.id) === -1;
        });
      } else {
        rs = u.map(function(i){
          return t.state.medias[i];
        });
      }
    }

    return (rs || []).sort(this._sortByLikes);
  },

  getUsers: function MediasStore__getUsers(id) {
    var i, rs = [], m = this.state.userMediaMap;

    for (i in m) {
      if (m[i].indexOf(id) !== -1) {
        rs.push(i);
      }
    }

    return rs;
  },

  getMedias: function MediasStore__getMedias(id) {
    if (!id) {
      var m = this.state.medias;
      return Object.keys(m).map(function(k){ return m[k]; }).sort(this._sortByLikes);
    }

    return this.state.medias[id];
  },

  setMedias: function MediasStore__setMedias(facebook, omdb, userId) {
    this.state.medias = (this.state.medias || {});
    this.state.userMediaMap = (this.state.userMediaMap || {});
    this.state.userMediaMap[userId] = (this.state.userMediaMap[userId] || []);

    facebook.omdb = omdb;

    if (this.state.userMediaMap[userId].indexOf(facebook.id) === -1) {
      this.state.userMediaMap[userId].push(facebook.id);
    }

    this.state.medias[facebook.id] = facebook;

    this.hasChanged();
  },

  addUserToMedia: function MediasStore__addUserToMedia(user, media) {
    this.state.userMediaMap = (this.state.userMediaMap || {});
    this.state.userMediaMap[user] = (this.state.userMediaMap[user] || []);

    if (this.state.userMediaMap[user].indexOf(media) === -1) {
      this.state.userMediaMap[user].push(media);
    }
  },

  _sortByLikes: function MediasStore___sortByLikes(a, b) {
    return b.likes - a.likes;
  }
});

module.exports = MediasStore;
