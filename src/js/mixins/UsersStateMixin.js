var Marty = require('marty');
var UsersStore = require('../stores/UsersStore');

var UsersStateMixin = Marty.createStateMixin({
  listenTo: UsersStore,
  getState: function () {
    return {
      user: UsersStore.getCurrentUser()
    };
  }
});

module.exports = UsersStateMixin;
