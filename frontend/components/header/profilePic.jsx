var React = require('react');
var PropTypes = React.PropTypes;

var ProfilePic = React.createClass({

  render: function() {
    return (
      <div>
        <div className='profile-pic'/>
        <button onClick={this.props.onClick}>Click Me</button>
      </div>
    );
  }

});

module.exports = ProfilePic;
