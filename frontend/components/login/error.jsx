var React = require('react');

var LogInError = React.createClass({

  render: function() {

    return (
      <span className={"error-message " + (this.props.toggle ? "active" : "hidden")}
        >{this.props.message}</span>
    );
  }

});

module.exports = LogInError;
