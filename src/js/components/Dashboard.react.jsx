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
      Facebook.initialize(nextState.user.userID);
      return true;
    }
  },

  onItemClick: function Dashboard__onItemClick(media) {
    this.transitionTo('/series/' + media.id);
  },

  render: function () {
    var id = this.state.user.userID;
    var info = this.state.userInfo;
    var name = info && info.done && info.result && info.result.name;
    var text = name ? ["Logout (", name, ")"] : "Logout";
    var count = this.state.userMedia.length || 0;

    return (
      <div className="dashboard">
        <Header name={name} extra={{
          'Series Watched': count
          }}>
          <img src={"http://graph.facebook.com/" + id + "/picture?height=150&width=150"} className="dashboard__user-picture" />
        </Header>

        <div className="dashboard__content">
          <UserLikes onItemClick={this.onItemClick} />
          <FriendsLikes onItemClick={this.onItemClick} />
        </div>
      </div>
    );
  },

  _unauth: function Dashboard___unauth(e) {
    e.preventDefault();
    Auth.logout();
    UsersActionCreators.auth(null);
    Facebook.initialized = false;
  },
});

module.exports = Dashboard;
