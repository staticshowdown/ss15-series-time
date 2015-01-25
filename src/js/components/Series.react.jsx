var React = require('react');

require('../../css/Series');

var Series = React.createClass({
  onClick: function Series__onClick(e) {
    e.preventDefault();
    this.props.onClick && this.props.onClick(this.props.media);
  },

  render: function () {
    var m = this.props.media;

    return (
      <div
        className="series"
        style={{ backgroundPosition: '50% 50%', backgroundImage: 'url(' + m.omdb.Poster + ')' }}
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
