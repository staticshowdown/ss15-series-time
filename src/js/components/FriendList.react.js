var React = require('react');
var UsersStateMixin = require('../mixins/UsersStateMixin');

var FriendList = React.createClass({
  mixins: [ UsersStateMixin ],
  render: function FriendList__render() {
    var i, friends = [], id;

    id = this.state.userInfo.when({
      pending: function() { return 0; },
      failed: function() { return 0; },
      done: function(data) { return data.id; }
    });

    for (i in this.state.usersInfo) {
      if (i === id) {
        continue;
      }
      var info = this.state.usersInfo[i];
      friends.push(<li key={info.id}>{info.name}</li>);
    }

    if (friends.length === 0) {
      return <div><small>No friends.</small></div>
    }

    return (
      <div>
        <h3>Friend list</h3>
        <ul>{friends}</ul>
      </div>
    );
  }
});

module.exports = FriendList;
