var React = require('react');
var Series = require('./Series.react');
var MediasStore = require('../stores/MediasStore');

require('../../css/FriendsLikes');

var FriendsLikes = React.createClass({
  getInitialState: function(){
    return {
      medias: MediasStore.getForUser(this.props.userId, true),
    };
  },

  componentDidMount: function FriendsLikes__componentDidMount() {
    this.mediasStoreListener = MediasStore.addChangeListener(this.onMediasStoreChanged);
  },

  componentWillUnmount: function FriendsLikes__componentWillUnmount() {
    this.mediasStoreListener.dispose();
  },

  onMediasStoreChanged: function FriendsLikes__onMediasStoreChanged() {
    this.setState({
      medias: MediasStore.getForUser(this.props.userId, true),
    });
  },

  render: function FriendsLike__render() {
    if (!this.state.medias || this.state.medias.length === 0) {
      return null;
    }

    var i, m = this.state.medias;

    var series = this.state.medias.map(function (m) {
      return <Series key={m.id} friends={ true } media={m} onClick={this.props.onItemClick} />;
    }, this);

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
