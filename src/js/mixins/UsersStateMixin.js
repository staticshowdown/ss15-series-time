var Marty = require('marty');
var UsersStore = require('../stores/UsersStore');

var UsersStateMixin = Marty.createStateMixin({
  listenTo: UsersStore,
  getState: function () {
    return {
      UsersInfo: UsersStore.getUsersInfo()
    };
  }
});

module.exports = UsersStateMixin;
