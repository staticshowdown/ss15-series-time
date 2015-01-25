var React = require('react');
var MediasStateMixin = require('../mixins/MediasStateMixin');

var MediaList = React.createClass({
  mixins: [ MediasStateMixin ],
  render: function MediaList__render() {
    var m = this.state.medias;
    var i, lis = [];
    for (i in m) {
      lis.push(
        <li key={m[i].id}><a href={m[i].url} target="_blank">{m[i].title}</a></li>
      );
    }

    return (
      <div>
        <h3>Media list</h3>
        <ul>{lis}</ul>
      </div>
    );
  }
});

module.exports = MediaList;
