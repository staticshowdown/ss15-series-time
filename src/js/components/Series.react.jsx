var React = require('react');

require('../../css/Series');

var Series = React.createClass({
  render: function () {
    var m = this.props.media;

    if (!m) {
      return (
        <div className="series" style={{ backgroundImage: 'url(https://walter.trakt.us/images/shows/000/001/390/posters/thumb/e2e8d04f11.jpg?1421889495)' }}>
        </div>
      );
    }

    return (
      <div className="series" style={{ backgroundPosition: '50% 50%', backgroundImage: 'url(' + m.omdb.Poster + ')' }}>
        <div className="series__overlay">
          <div className="series__controls">
            <img src="" />
            <img src="" />
            <img src="" />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Series;
