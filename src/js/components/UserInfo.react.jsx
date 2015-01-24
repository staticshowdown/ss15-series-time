var React = require('react');

require('../../css/UserInfo');

var UserInfo = React.createClass({
  render: function () {
    return (
      <div className="user-info">
        <div className="user-info__content">
          <img src="/images/logo.png" className="user-info__logo" />
          <h1 className="user-info__username">Tadeu Zagallo</h1>
          <img src="http://graph.facebook.com/tadeuzagallo/picture?height=150&width=150" className="user-info__picture"/>

          <div className="user-info__stats">
            Member Since
            <span className="user-info__stats__value">7 JAN 2014</span>

            Series Watched
            <span className="user-info__stats__value">34</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserInfo;
