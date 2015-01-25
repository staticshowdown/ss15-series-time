var React = require('react');

var Header =  require('./Header.react');
var UserLikes = require('./UserLikes.react');

var UserProfile = React.createClass({
  render: function () {
    return (
      <div className="user-profile">
        <Header name="Tadeu Zagallo" extra={{
          'Series Watched': 74
          }}>
          <img src={"http://graph.facebook.com/tadeuzagallo/picture?height=150&width=150"} className="dashboard__user-picture" />
        </Header>
        <div className="dashboard__content">
          <UserLikes />
        </div>
      </div>
    );
  }
});

module.exports = UserProfile;
