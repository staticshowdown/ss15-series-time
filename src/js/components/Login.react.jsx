var React = require('react');
var Navigation = require('react-router').Navigation;

var LoginButton = require('./LoginButton.react');
var UsersStore = require('../stores/UsersStore');
var UsersActionCreators = require('../actions/UsersActionCreators');
var UsersStateMixin = require('../mixins/UsersStateMixin');
var Auth = require('../lib/Auth');

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
    return (
      <div>
        <LoginButton
          key="facebook"
          provider="facebook"
          name="Facebook"
          onClick={ this._auth }/>
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