var React = require('react');
var State = require('react-router').State;
var Navigation = require('react-router').Navigation;
var Header = require('./Header.react');
var FriendWatcher = require('./FriendWatcher.react');
var MediasStore = require('../stores/MediasStore');
var UsersStateMixin = require('../mixins/UsersStateMixin');
var Facebook = require('../lib/api/Facebook');

require('../../css/SeriesDetails');

var SeriesDetails =  React.createClass({
  mixins: [ State, Navigation, UsersStateMixin ],

  getInitialState: function SeriesDetails__getInitialState() {
    var id = this.getParams().id;

    return {
      id: id,
      media: MediasStore.getMedias(id),
    };
  },

  shouldComponentUpdate: function Dashboard__shouldComponentUpdate(nextProps, nextState) {
    Facebook.initialize(nextState.user.userID);
    return true;
  },

  componentDidMount: function SeriesDetails__componentDidMount() {
    this.mediasStoreListener = MediasStore.addChangeListener(this.onMediasStoreChanged);
  },

  componentWillUnmount: function SeriesDetails__componentWillUnmount() {
    this.mediasStoreListener.dispose();
  },

  onMediasStoreChanged: function SeriesDetails__onMediasStoreChanged() {
    var id = this.state.user.userID;
    var userCount = 0;

    if (id) {
      userCount = MediasStore.getUserCount(this.state.id);
    }

    this.setState({
      media: MediasStore.getMedias(this.state.id),
      userCount: userCount,
    });
  },

  render: function() {
    var m = this.state.media;
    var userCount = this.state.userCount || 0;

    if (!m) {
      return null;
    }

    var _info = {
      Year: m.omdb.Year || '-',
      Country: m.omdb.Country || '-',
      Genre: m.omdb.Genre || '-',
      Schedule: m.schedule || '-',
    };

    var info = Object.keys(_info).map(function (name) {
      return (
        <div className="details__info__entry">
          { name }
          <div className="details__info__value">
            { _info[name] }
          </div>
        </div>
      );
    });

    var friends = [1,1,1,1,1,1,1].map(function () {
      return <FriendWatcher />;
    });

    return (
      <div className="details">
        <Header name={ m.name } extra={{
          'Friends Watching': userCount,
        }}>
          <img src={ m.omdb.Poster } className="details__picture" />
        </Header>

        <div className="details__content">
          <ul className="details__menu">
            <li>I've watched</li>
            <li>Like</li>
            <li>Share</li>
          </ul>

          <div className="details__info">
            { info }
          </div>

          <div className="details__sinopsis">
            { m.omdb.Plot }
          </div>

          <div className="details__friends">
            <div className="details__friends__title">
              Friends watchers
            </div>

            { friends }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SeriesDetails;
