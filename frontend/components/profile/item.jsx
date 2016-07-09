var React = require('react');
var Edit = require('./edit');

var ProfileItem = React.createClass({

  _edit: function() {
    if (this.props.editable) {
      return ( <Edit field={this.props.field} input={this.props.input} /> );
    }
  },

  render: function() {
    return (
      <div>
        <span>{this.props.field}:</span>
        <span>{this.props.input}</span>
        {this._edit()}
      </div>
    );
  }

});

module.exports = ProfileItem;
