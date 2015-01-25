var Marty = require('marty');
var MediasStore = require('../stores/MediasStore');

var MediasStateMixin = Marty.createStateMixin({
  listenTo: MediasStore,
  getState: function () {
    return {
      medias: MediasStore.get(),
    };
  }
});

module.exports = MediasStateMixin;
