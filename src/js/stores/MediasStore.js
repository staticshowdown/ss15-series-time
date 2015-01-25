var Marty = require('marty');
var MediasConstants = require('../constants/MediasConstants');
var MediasActionCreators = require('../actions/MediasActionCreators');
var Auth = require('../lib/Auth');

var MediasStore = Marty.createStore({
  handlers: {
    setMedias: MediasConstants.SET
  },

  getInitialState: function MediasStore__getInitialState() {
    return {
      medias: {},
      userMediaMap: {},
    };
  },

  getForUser: function MediasStore__getForUser(userId) {
    var rs, i, l, u = this.state.userMediaMap[userId];
    if (u && u.map) {
      var t = this;
      rs = u.map(function(i){
        return t.state.medias[i];
      });
    }

    return (rs || []).sort(this._sortByLikes);
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

  _sortByLikes: function MediasStore___sortByLikes(a, b) {
    return b.likes - a.likes;
  }
});

module.exports = MediasStore;
