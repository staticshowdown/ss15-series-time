var Marty = require('marty');
var UsersStore = require('../stores/UsersStore');
var MediasStore = require('../stores/MediasStore');

var UserWithMediaStateMixin = Marty.createStateMixin({
  listenTo: [ UsersStore, MediasStore ],

  getState: function () {
    var user = UsersStore.getCurrentUser();
    var id = user.userID;

    return {
      user: user,
      userInfo: UsersStore.getCurrentUserInfo(),
      usersInfo: UsersStore.getUsersInfo(),
      userMedia: MediasStore.getForUser(id),
    };
  }
});

module.exports = UserWithMediaStateMixin;
