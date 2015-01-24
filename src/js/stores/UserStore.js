var Marty = require('marty');
var UserConstants = require('../constants/UserConstants');

var UserStore = Marty.createStore({
  handlers: {
    login: UserConstants.LOGIN
  },
  getInitialState: function () {
    return {};
  },
  login: function (/* provider */) {
    //ref.authWithOAuthPopup(provider, function (err, user) {
      //if (err) {
        //this.state = { error: err };
      //} else if (user) {
        //this.state = user;
      //}

      //this.hasChanged();
    //});
  },
  getUserInfo: function () {
    return this.state;
  }
});

module.exports = UserStore;
