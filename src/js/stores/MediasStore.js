var Marty = require('marty');
var MediasConstants = require('../constants/MediasConstants');
var MediasActionCreators = require('../actions/MediasActionCreators');
var Auth = require('../lib/Auth');

var MediasStore = Marty.createStore({
  handlers: {
    set: MediasConstants.SET
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

    return rs || [];
  },

  get: function MediasStore__get(id) {
    if (!id) {
      return this.state.medias;
    }

    return this.state.medias[id];
  },

  set: function MediasStore__set(facebook, omdb, userId) {
    this.state.medias = (this.state.medias || {});
    this.state.userMediaMap = (this.state.userMediaMap || {});
    this.state.userMediaMap[userId] = (this.state.userMediaMap[userId] || []);

    facebook.omdb = omdb;

    if (this.state.userMediaMap[userId].indexOf(facebook.id) === -1) {
      this.state.userMediaMap[userId].push(facebook.id);
    }

    this.state.medias[facebook.id] = facebook;

    this.hasChanged();
  }
});

module.exports = MediasStore;
