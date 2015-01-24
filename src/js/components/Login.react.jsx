var React = require('react');
var LoginButton = require('./LoginButton.react');

var buttons = {
  facebook: 'Facebook',
  google: 'Google+',
  github: 'Github',
  twitter: 'Twitter'
};

var Login = React.createClass({
  render: function Login__render() {
    var loginButtons = Object.keys(buttons).map(function (key) {
        return (
          <LoginButton
            key={ key }
            provider={ key }
            name={ buttons[key] }
            onClick={ this._auth }/>
        );
    }, this);

    return (
      <div>
        { loginButtons }
      </div>
    );
  },
  _auth: function Login___auth(provider) {
    console.log('Log in with %s', provider);
  }
});

module.exports = Login;
