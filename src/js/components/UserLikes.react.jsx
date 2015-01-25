var React = require('react');
var Series = require('./Series.react');

require('../../css/UserLikes');

var UserLikes = React.createClass({
  render: function UserLikes__render() {
    var series = [1,1,1,1,1,1,1,1].map(function () {
      return <Series />;
    });

    return (
      <div className="user-likes">
        <div className="user-likes__title">
          Likes
          <span className="user-likes__title__value">23</span>

          <div className="user-likes__series">
            { series }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserLikes;
