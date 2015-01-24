var React = require('react');

var LoginButton = React.createClass({
  propTypes: {
    provider: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  },
  render: function LoginButton__render() {
    return (
      <div onClick={ this._clicked }>
        Login with
        <strong> { this.props.name }</strong>
      </div>
    );
  },
  _clicked: function LoginButton___clicked() {
    this.props.onClick(this.props.provider);
  }
});

module.exports = LoginButton;
