var React = require('react');
var Navigation = require('react-router').Navigation;

var Auth = require('../lib/Auth');
var UsersActionCreators = require('../actions/UsersActionCreators');
var UsersStateMixin = require('../mixins/UsersStateMixin');

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
    return (
      <div className="dashboard">
        Dashboard
        <button type="button" onClick={this._unauth}>Logout ({Auth.user.facebook.displayName})</button>
      </div>
    );
  },
  _unauth: function Dashboard___unauth(e) {
    e.preventDefault();
    Auth.logout();
    UsersActionCreators.auth(null);
  }
});

module.exports = Dashboard;
