var React = require('react');
var Navigation = require('react-router').Navigation;

var Auth = require('../lib/Auth');
var UsersActionCreators = require('../actions/UsersActionCreators');
var UsersStateMixin = require('../mixins/UsersStateMixin');
var Facebook = require('../lib/api/Facebook');

var Dashboard = React.createClass({
  mixins: [ UsersStateMixin, Navigation ],
  statics: {
    willTransitionTo: function (transition) {
      if (!Auth.user) {
        transition.redirect('/login');
      }
    }
  },
  shouldComponentUpdate: function Dashboard__shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.user) {
      this.transitionTo('/login');
      return false;
    } else {
      return true;
    }
  },
  render: function () {
    var info = this.state.userInfo;
    var name = info.done && info.result && info.result.name;
    var text = name ? ["Logout (", name, ")"] : "Logout";
    return (
      <div className="dashboard">
        Dashboard
        <button type="button" onClick={this._unauth}>{text}</button>
        <button type="button" onClick={this._temp}>Load friends</button>
      </div>
    );
  },
  _unauth: function Dashboard___unauth(e) {
    e.preventDefault();
    Auth.logout();
    UsersActionCreators.auth(null);
  },
  _temp: function Dashboard___temp(e) {
    e.preventDefault();
    var id = Auth.user && Auth.user.userID;
    if (!id) {
      return;
    }
    Facebook.friendsFor(id);
  }
});

module.exports = Dashboard;
