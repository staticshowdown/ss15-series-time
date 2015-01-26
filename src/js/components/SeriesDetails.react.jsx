var React = require('react');
var State = require('react-router').State;
var Navigation = require('react-router').Navigation;
var Header = require('./Header.react');
var FriendWatcher = require('./FriendWatcher.react');
var MediasStore = require('../stores/MediasStore');
var UsersStateMixin = require('../mixins/UsersStateMixin');
var Facebook = require('../lib/api/Facebook');
var FB = require('fb');

require('../../css/SeriesDetails');

var SeriesDetails =  React.createClass({
  mixins: [ State, Navigation, UsersStateMixin ],

  getInitialState: function SeriesDetails__getInitialState() {
    var id = this.getParams().id;
    var users = [];
    var userCount = 0;

    if (id) {
      users = MediasStore.getUsers(id);
      userCount = users.length;
    }

    return {
      id: id,
      media: MediasStore.getMedias(id),
      users: users,
      userCount: userCount,
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
    var users = [];
    var userCount = 0;

    if (id) {
      users = MediasStore.getUsers(this.state.id);
      userCount = users.length;
    }

    this.setState({
      media: MediasStore.getMedias(this.state.id),
      users: users,
      userCount: userCount,
    });
  },

  onClickShare: function SeriesDetails__onClickShare(l, e) {
    e.preventDefault();
    FB.ui({
      method: 'shared',
      href: l,
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
      //Schedule: m.schedule || '-',
    };

    var info = Object.keys(_info).map(function (name) {
      return (
        <div className="details__info__entry" key={name}>
          { name }
          <div className="details__info__value">
            { _info[name] }
          </div>
        </div>
      );
    });

    var friends = this.state.users.map(function (id) {
      return <FriendWatcher id={id} />;
    });

    var img = (m.omdb.Poster || "")
    img = '/__/proxy/imdb' + img.replace(/^https?:\/\/[^/]+/i, '');

    return (
      <div className="details">
        <Header name={ m.name } extra={{
          'Friends Watching': userCount,
        }}>
          <img src={ img } className="details__picture" />
        </Header>

        <div className="details__content">
          <ul className="details__menu">
            <li onClick={this.onClickShare.bind(this, m.link)}>Share</li>
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
