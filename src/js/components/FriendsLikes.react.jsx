var React = require('react');
var Series = require('./Series.react');
var MediasStore = require('../stores/MediasStore');
var UsersStateMixin = require('../mixins/UsersStateMixin');

require('../../css/FriendsLikes');

var FriendsLikes = React.createClass({
  mixins: [ UsersStateMixin ],

  componentDidMount: function FriendsLikes__componentDidMount() {
    this.mediasStoreListener = MediasStore.addChangeListener(this.onMediasStoreChanged);
  },

  componentWillUnmount: function FriendsLikes__componentWillUnmount() {
    this.mediasStoreListener.dispose();
  },

  onMediasStoreChanged: function FriendsLikes__onMediasStoreChanged() {
    var id = this.state.user.userID;
    if (id) {
      this.setState({
        medias: MediasStore.getForUser(id, true),
      });
    }
  },

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
        Your friends watched
        <div className="friends-likes__series">
          { series }
        </div>
      </div>
    );
  }
});

module.exports = FriendsLikes;
