var Marty = require('marty');
var UserStore = require('../stores/UserStore');

var UserStateMixin = Marty.createStateMixin({
  listenTo: UserStore,
  getState: function () {
    return {
      userInfo: UserStore.getUserInfo()
    };
  }
});

module.exports = UserStateMixin;
