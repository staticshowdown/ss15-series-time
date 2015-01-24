var Marty = require('marty');
var UsersConstants = require('../constants/UsersConstants');
var UsersActionCreators = require('../actions/UsersActionCreators');
var Auth = require('../lib/Auth');

var UsersStore = Marty.createStore({
  handlers: {
    auth: UsersConstants.AUTH,
    info: UsersConstants.INFO
  },
  getInitialState: function UsersStore__getInitialState() {
    return {
      info: {},
    }; // Useless
  },
  getCurrentUser: function UsersStore__getCurrentUser() {
    return this.state.current;
  },
  getCurrentUserInfo: function UsersStore__getCurrentUserInfo() {
    var data = this.state.current;
    if (!data || !data.userID) {
      return null;
    }

    return this.fetch({
      id: data.userID,
      locally: function UsersStore__getCurrentUserInfo__locally(){
        return this.state.info && this.state.info[data.userID];
      },
      remotely: function UsersStore__getCurrentUserInfo__remotely(){
        return new Promise(function(resolve, reject){
          FB.api('/me', function(data){
            UsersActionCreators.info(data);
            resolve(null);
          });
        });
      }
    });
  },
  getUsersInfo: function UsersStore__getUsersInfo() {
    return this.state.info || {};
  },
  auth: function UsersStore__auth(data) {
    this.setState({
      current: data,
    });
  },
  info: function UsersStore__info(data) {
    this.state.info = this.state.info || {};
    if (data.forEach) {
      var i, l;
      for (i = 0, l = data.length; i < l; i++) {
        this.state.info[data[i].id] = data[i];
      }
    } else {
      this.state.info[data.id] = data;
    }
    this.hasChanged();
  }
});

module.exports = UsersStore;
