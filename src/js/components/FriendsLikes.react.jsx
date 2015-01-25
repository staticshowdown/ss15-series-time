var React = require('react');
var Series = require('./Series.react');
var MediasStateMixin = require('../mixins/MediasStateMixin');

require('../../css/FriendsLikes');

var FriendsLikes = React.createClass({
  mixins: [ MediasStateMixin ],

  render: function FriendsLike__render() {
    if (!this.state.medias || this.state.medias.length === 0) {
      return null;
    }

    var i, m = this.state.medias;

    var series = this.state.medias.map(function (m) {
      return <Series media={m} />;
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
