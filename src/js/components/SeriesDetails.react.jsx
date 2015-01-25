var React = require('react');
var Header = require('./Header.react');
var FriendWatcher = require('./FriendWatcher.react');

require('../../css/SeriesDetails');

var _info = {
  Year: 2014,
  Country: 'USA',
  Genre: 'Drama',
  Seasons: 3,
  Episodes: 12
};

var SeriesDetails =  React.createClass({
  render: function() {
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
        <Header name="Hannibal" extra={{
          'Friends Watching': 34,
          'Next Season': '12 FEB 2015'
        }}>
          <img src="https://walter.trakt.us/images/shows/000/039/825/posters/thumb/430e1f1088.jpg?1420722108" className="details__picture" />
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
            Explores the early relationship between the renowned psychiatrist and his patient, a young FBI criminal profiler, who is haunted by his ability to empathize with serial killers.
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
