var Marty = require('marty');
var UsersConstants = require('../constants/UsersConstants');

var UsersActionCreators = Marty.createActionCreators({
  auth: UsersConstants.AUTH(function (data) {
    this.dispatch(data);
  })
});

module.exports = UsersActionCreators;
