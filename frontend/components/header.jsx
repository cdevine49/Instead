var React = require('react');
var LogOut = require('./header/logout');
var AccountBox = require('./header/accountBox');
var SessionStore = require('../stores/session');
var Link = require('react-router').Link;

var Header = React.createClass({

  // <ProfilePic onClick={this._alert}/>
  // <AccountBox toggle={true}/>
  render: function() {
    return (
      <div>
        <h1>Instead</h1>
        <Link to={'/'}>Home</Link>
        <Link to={'/users/' + SessionStore.currentUser().id}>Profile</Link>
        <Link to={'/jobs/'}>Jobs</Link>
      </div>
    );
  }

});

module.exports = Header;
