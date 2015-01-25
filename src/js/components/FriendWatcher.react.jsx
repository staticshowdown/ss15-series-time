var React = require('react');

require('../../css/FriendWatcher');

var FriendWatcher = React.createClass({
  render: function () {
    var id = this.props.id;

    return (
      <div className="friend-watcher">
        <img src={"http://graph.facebook.com/" + id + "/picture?width=73&height=73"} className="friend-watcher__picture" />
        <div className="friend-watcher__name">
          Tadeu Zagallo
        </div>
      </div>
    );
  }
});

module.exports = FriendWatcher;
