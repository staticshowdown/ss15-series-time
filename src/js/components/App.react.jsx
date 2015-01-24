var React = require('react');

var App = React.createClass({
  render: function App__render() {
    var now = new Date();

    return (
      <div>
        <h1>It works!</h1>
        <p>with hot code push</p>
        <small>{now.toString()}</small>
      </div>
    );
  }
});

module.exports = App;
