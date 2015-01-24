var React = require('react');

require('../../css/LoginButton');

var LoginButton = React.createClass({
  propTypes: {
    provider: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  },
  render: function LoginButton__render() {
    return (
      <div onClick={ this._clicked } className={ 'login-button login-button--' + this.props.provider }>
        Login with&nbsp;
        <span className="login-button__provider">
          { this.props.name }
        </span>
      </div>
    );
  },
  _clicked: function LoginButton___clicked() {
    this.props.onClick(this.props.provider);
  }
});

module.exports = LoginButton;
