var React = require('react');
var Series = require('./Series.react');
var MediasStore = require('../stores/MediasStore');
var UsersStateMixin = require('../mixins/UsersStateMixin');

require('../../css/UserLikes');

var UserLikes = React.createClass({
  mixins: [ UsersStateMixin ],

  componentDidMount: function UserLikes__componentDidMount() {
    this.mediasStoreListener = MediasStore.addChangeListener(this.onMediasStoreChanged);
  },

  componentWillUnmount: function UserLikes__componentWillUnmount() {
    this.mediasStoreListener.dispose();
  },

  onMediasStoreChanged: function UserLikes__onMediasStoreChanged() {
    var id = this.state.user.userID;
    if (id) {
      this.setState({
        medias: MediasStore.getForUser(id),
      });
    }
  },

  render: function UserLikes__render() {
    if (!this.state.medias || this.state.medias.length === 0) {
      return null;
    }

    var count = this.state.medias.length;

    var series = this.state.medias.map(function (m) {
      return <Series media={m} />;
    });

    return (
      <div className="user-likes">
        <div className="user-likes__title">
          Likes
          <span className="user-likes__title__value">{count}</span>
          <div className="user-likes__series">
            { series }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserLikes;
