var Marty = require('marty');
var MediasConstants = require('../constants/MediasConstants');

var MediasActionCreators = Marty.createActionCreators({
  set: MediasConstants.SET(function (facebook, omdb, userId) {
    this.dispatch(facebook, omdb, userId);
  }),
});

module.exports = MediasActionCreators;
