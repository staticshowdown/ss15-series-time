var React = require('react');
var Navigation = require('react-router').Navigation;

var Auth = require('../lib/Auth');
var UsersActionCreators = require('../actions/UsersActionCreators');
var UsersStateMixin = require('../mixins/UsersStateMixin');
var UserWithMediaStateMixin = require('../mixins/UserWithMediaStateMixin');
var Facebook = require('../lib/api/Facebook');
var FriendList = require('./FriendList.react');

var Header = require('./Header.react');
var UserLikes = require('./UserLikes.react');
var FriendsLikes = require('./FriendsLikes.react');

require('../../css/Dashboard');

var Dashboard = React.createClass({
  mixins: [ UserWithMediaStateMixin, Navigation ],

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
    var id = this.state.user.userID;
    var info = this.state.userInfo;
    var name = info && info.done && info.result && info.result.name;
    var text = name ? ["Logout (", name, ")"] : "Logout";

    return (
      <div className="dashboard">
        <Header name={name} extra={{
          'Series Watched': this.state.userMedia.length || 0
        }}>
          <img src={"http://graph.facebook.com/" + id + "/picture?height=150&width=150"} className="dashboard__user-picture" />
        </Header>

        <div className="dashboard__content">
          <UserLikes />
          <FriendsLikes />
          <button type="button" onClick={this._temp}>Load data</button>
        </div>
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

    Facebook.friendsFor(id).done(function(response){
      var ids = response.map(function(r){ return r.id; });
      ids.push(id);
      Facebook.videosFor(ids);
    });
  }
});

module.exports = Dashboard;
