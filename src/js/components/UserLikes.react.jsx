var React = require('react');
var Series = require('./Series.react');
var MediasStore = require('../stores/MediasStore');

require('../../css/UserLikes');

var UserLikes = React.createClass({
  getInitialState: function(){
    return {
      medias: MediasStore.getForUser(this.props.userId),
    };
  },

  componentDidMount: function UserLikes__componentDidMount() {
    this.mediasStoreListener = MediasStore.addChangeListener(this.onMediasStoreChanged);
  },

  componentWillUnmount: function UserLikes__componentWillUnmount() {
    this.mediasStoreListener.dispose();
  },

  onMediasStoreChanged: function UserLikes__onMediasStoreChanged() {
    this.setState({
      medias: MediasStore.getForUser(this.props.userId),
    });
  },

  render: function UserLikes__render() {
    if (!this.state.medias || this.state.medias.length === 0) {
      return null;
    }

    var count = this.state.medias.length;

    var series = this.state.medias.map(function (m) {
      if (!m) {
        return null;
      }
      return <Series key={m.id} media={m} onClick={this.props.onItemClick} />;
    }, this);

    return (
      <div className="user-likes">
        <div className="user-likes__title">
          Your series
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
