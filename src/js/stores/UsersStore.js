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
    return this.fetch({
      id: 'current',
      locally: function UsersStore__getCurrentUser__locally() {
        return this.state.current;
      },
      remotely: function UsersStore__getCurrentUser__remotely() {
        UsersActionCreators.auth(Auth.user);
        return true;
      }
    });
  },
  auth: function UsersStore__auth(data) {
    console.log('store.auth', data);
    this.setState({
      current: data,
    });
  }
});

module.exports = UsersStore;
