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

  get: function MediasStore__get(userId) {
    if (!userId) {
      return this.state.medias;
    }

    if (!this.state.userMediaMap[userId]) {
      return [];
    }

    var m = this.state.medias;
    return this.state.userMediaMap[userId].map(function(id){
      return m[id];
    });
  },

  set: function MediasStore__set(data, userId) {
    if (!data || data.length <= 0) {
      return;
    }

    this.state.medias = (this.state.medias || {});
    this.state.userMediaMap = (this.state.userMediaMap || {});
    this.state.userMediaMap[userId] = (this.state.userMediaMap[userId] || []);

    var i, l;
    for (i = 0, l = data.length; i < l; i++) {
      var d = data[i];
      if (d.application.name != 'TV Shows') {
        continue;
      }

      var m = d.data.tv_show;
      m.dates = {
        publish: new Date(d.publish_time),
        start: new Date(d.start_time),
        end: new Date(d.end_time),
      };

      if (!this.state.userMediaMap[userId].indexOf(m.id)) {
        this.state.userMediaMap[userId].push(m.id);
      }

      this.state.medias[m.id] = m;
    }

    this.hasChanged();
  }
});

module.exports = MediasStore;
