var Marty = require('marty');
var MediasConstants = require('../constants/MediasConstants');

var MediasActionCreators = Marty.createActionCreators({
  set: MediasConstants.SET(function (data, userId) {
    this.dispatch(data, userId);
  }),
});

module.exports = MediasActionCreators;
