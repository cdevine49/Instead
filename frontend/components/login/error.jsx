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

Array.prototype.all = function (func) {
  func = func || function (el) { return el; };
  for (var i = 0; i < this.length; i++) {
    if (!func(this[i])) { return false; }
  }
  return true;
};
