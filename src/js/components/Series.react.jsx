var React = require('react');

require('../../css/Series');

var Series = React.createClass({
  render: function () {
    return (
      <div className="series" style={{ backgroundImage: 'url(https://walter.trakt.us/images/shows/000/001/390/posters/thumb/e2e8d04f11.jpg?1421889495)' }}>
      </div>
    );
  }
});

module.exports = Series;
