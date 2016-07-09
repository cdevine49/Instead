var React = require('react');
var LogOut = require('./logout');
var Link = require('react-router').Link;

var AccountBox = React.createClass({

  render: function() {
    return (
      <div >
        <Link to={'/account/'}>My Account</Link>
        <LogOut />
      </div>
    );
  }

});

module.exports = AccountBox;
