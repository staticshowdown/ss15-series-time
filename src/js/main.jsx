var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Container = require('./components/Container.react');
var Login = require('./components/Login.react');
var Dashboard = require('./components/Dashboard.react');
var Auth = require('./lib/Auth.js');
var UsersActionCreators = require('./actions/UsersActionCreators.js');

var routes = (
  <Route path="/" handler={ Container }>
    <DefaultRoute handler={ Dashboard } />
    <Route name="login" path="login" handler={ Login } />
  </Route>
);

FB.init({
  appId      : '650586588396782',
  xfbml      : true,
  version    : 'v2.2'
});

FB.getLoginStatus(function(response){
  if (response.status === 'connected') {
    Auth.user = response.authResponse;
    UsersActionCreators.auth(Auth.user);
  }
});

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('stage'));
});
