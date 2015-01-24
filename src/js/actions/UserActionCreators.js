var Marty = require('marty');
var UserConstants = require('../constants/UserConstants');

var UserActionCreators = Marty.createActionCreators({
  login: UserConstants.LOGIN(function (provider) {
    this.dispatch(provider);
  })
});

module.exports = UserActionCreators;
