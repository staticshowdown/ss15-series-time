var React = require('react');

require('../../css/Series');

var Series = React.createClass({
  onClick: function Series__onClick(e) {
    e.preventDefault();
    this.props.onClick && this.props.onClick(this.props.media);
  },

  render: function () {
    var m = this.props.media;

    var img = (m.omdb.Poster || "")
    img = '/__/proxy/imdb' + img.replace(/^https?:\/\/[^/]+/i, '');

    return (
      <div
        className="series"
        style={{ backgroundPosition: '50% 50%', backgroundImage: 'url(' + img + ')' }}
        title={ m.name }
        onClick={this.onClick}>
        <div className="series__overlay">
          <h4>{m.name}</h4>
        </div>
      </div>
    );
  }
});

module.exports = Series;
