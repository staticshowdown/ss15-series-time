var React = require('react');
var Navigation = require('react-router').Navigation;

var UsersStore = require('../stores/UsersStore');
var UsersActionCreators = require('../actions/UsersActionCreators');
var UsersStateMixin = require('../mixins/UsersStateMixin');
var Auth = require('../lib/Auth');

require('../../css/Login');

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
    var user = Auth.user;

    var button;
    if (user === false) {
      button = (
        <div className="login__button" style={{cursor:'wait'}}>
          Preparing your popcorn...
        </div>
      );
    } else {
      button = (
        <div onClick={ this._auth } className="login__button">
          Login with&nbsp;
          <span className="login__button__facebook">Facebook</span>
        </div>
      );
    }

    return (
      <div className="login">
        <div className="login__box">
          <div className="login__text">
            Follow your favorite series and check what your friends have been watching.
          </div>

          {button}
        </div>
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
