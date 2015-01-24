var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Container = React.createClass({
  render: function () {
    return (
      <div className="container">
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Container;
