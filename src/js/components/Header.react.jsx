var React = require('react');

require('../../css/Header');

var Header = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    extra: React.PropTypes.object.isRequired
  },
  render: function () {
    var extra = Object.keys(this.props.extra).map(function (key) {
      return (
        <span key={key}>
          { key }
          <span className="header__extra__value">{ this.props.extra[key] }</span>
        </span>
      );
    }, this);

    return (
      <div className="header">
        <div className="header__content">
          <img src="/images/logo.png" className="header__logo" />
          <h1 className="header__username">{ this.props.name }</h1>

          <div className="header__extra">{ extra }</div>
          { this.props.children }
        </div>
      </div>
    );
  }
});

module.exports = Header;
