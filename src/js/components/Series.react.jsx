var React = require('react');

require('../../css/Series');

var Series = React.createClass({
  render: function () {
    var m = this.props.media;

    return (
      <div
        className="series"
        style={{ backgroundPosition: '50% 50%', backgroundImage: 'url(' + m.omdb.Poster + ')' }}
        title={ m.name }>
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
