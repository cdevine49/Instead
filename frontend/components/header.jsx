var React = require('react');
var LogOut = require('./header/logout');
var AccountBox = require('./header/accountBox');
var ProfilePic = require('./header/profilePic');

var Header = React.createClass({

  _alert: function () {
    console.log("test");
  },

  render: function() {
    return (
      <div>
        <h1>Instead</h1>
        <ProfilePic onClick={this._alert}/>
        <AccountBox toggle={true}/>
      </div>
    );
  }

});

module.exports = Header;
