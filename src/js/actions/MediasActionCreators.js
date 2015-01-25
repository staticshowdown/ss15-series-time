var Marty = require('marty');
var MediasConstants = require('../constants/MediasConstants');

var MediasActionCreators = Marty.createActionCreators({
  set: MediasConstants.SET(function (facebook, omdb, userId) {
    this.dispatch(facebook, omdb, userId);
  }),
  userToMedia: MediasConstants.USERTOMEDIA(function(user, media){
    this.dispatch(user, media);
  })
});

module.exports = MediasActionCreators;
