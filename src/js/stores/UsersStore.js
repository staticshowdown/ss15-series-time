var Marty = require('marty');
var UsersConstants = require('../constants/UsersConstants');
var UsersActionCreators = require('../actions/UsersActionCreators');
var Auth = require('../lib/Auth');

var UsersStore = Marty.createStore({
  handlers: {
    auth: UsersConstants.AUTH
  },
  getInitialState: function () {
    return {
      users: {},
    };
  },
  getCurrentUser: function UsersStore__getCurrentUser() {
    return this.state.current;
  },
  auth: function UsersStore__auth(data) {
    this.setState({
      current: data,
    });
  }
});

module.exports = UsersStore;
