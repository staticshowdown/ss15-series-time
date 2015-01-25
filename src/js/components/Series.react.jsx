var React = require('react');

require('../../css/Series');

var Series = React.createClass({
  onClick: function Series__onClick(e) {
    e.preventDefault();
    this.props.onClick && this.props.onClick(this.props.media);
  },

  render: function () {
    var m = this.props.media;

    var left = this.props.friends ?
      '' :
      <img src="/images/dashboard__icon-unlike.png" />;
    var right = this.props.friends ?
      <img src="/images/dashboard__icon-like.png" /> :
      <img src="/images/dashboard__icon-done.png" />;


    return (
      <div
        className="series"
        style={{ backgroundPosition: '50% 50%', backgroundImage: 'url(' + m.omdb.Poster + ')' }}
        title={ m.name }
        onClick={this.onClick}>
        <div className="series__overlay">
          <div className="series__controls">
            { left }
            <img src="/images/dashboard__icon-view.png" />
            { right }
            <h4>{m.name}</h4>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Series;
