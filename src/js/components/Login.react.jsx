var React = require('react');
var Firebase = require('firebase');
var Navigation = require('react-router').Navigation;

var LoginButton = require('./LoginButton.react');
var UsersStore = require('../stores/UsersStore');
var UsersActionCreators = require('../actions/UsersActionCreators');
var UsersStateMixin = require('../mixins/UsersStateMixin');
var Auth = require('../lib/Auth');

var ref = new Firebase('https://ss15-series-time.firebaseio.com/');

var Login = React.createClass({
  mixins: [ UsersStateMixin, Navigation ],
  statics: {
    willTransitionTo: function (transition) {
      if (Auth.user) {
        transition.redirect('/');
      }
    }
  },

  getInitialState: function Login__getInitialState() {
    return {
      loading: false,
    };
  },

  shouldComponentUpdate: function Login__shouldComponentUpdate(nextProps, nextState) {
    if (nextState.user) {
      this.transitionTo('/');
      return false;
    } else {
      return true;
    }
  },

  render: function Login__render() {
    var loginButtons = Object.keys(Auth.providers).map(function (key) {
        return (
          <LoginButton
            key={ key }
            provider={ key }
            name={ Auth.providers[key] }
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
    if (this.state.loading) {
      return;
    }

    var component = this;

    Auth.login(provider).finally(function(){
      component.setState({ loading: false });
    }).catch(function(err){
      console.error(err);
    }).done(function(data){
      UsersActionCreators.auth(data);
    });
  }
});

module.exports = Login;
