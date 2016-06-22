var React = require('react');
var LogOut = require('./header/logout');

var Header = React.createClass({

  render: function() {
    return (
      <div>
        <LogOut />
      </div>
    );
  }

});

module.exports = Header;
