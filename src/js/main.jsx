var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Container = require('./components/Container.react');
var Login = require('./components/Login.react');
var Dashboard = require('./components/Dashboard.react');

var routes = (
  <Route path="/" handler={ Container }>
    <DefaultRoute handler={ Dashboard } />
    <Route name="login" path="login" handler={ Login } />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
