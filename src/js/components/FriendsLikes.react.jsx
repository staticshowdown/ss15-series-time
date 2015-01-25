var React = require('react');
var Series = require('./Series.react');

require('../../css/FriendsLikes');

var FriendsLikes = React.createClass({
  render: function () {
    var series = [1,1,1,1].map(function () {
      return <Series />;
    });

    return (
      <div className="friends-likes">
        Most Friends Watching

        <div className="friends-likes__series">
          { series }
        </div>
      </div>
    );
  }
});

module.exports = FriendsLikes;
