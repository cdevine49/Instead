var React = require('react');
var ProfileUtil = require('../../utils/profile');
var EditName = require('./edit/editName');

var Edit = React.createClass({

  getInitialState: function() {
    return {
      formOpen: false
    };
  },

  _editing: function() {
    switch (this.props.field) {
      case "Name":
        return (
          <EditName
            firstName={this.props.input.split(" ")[0]}
            lastName={this.props.input.split(" ")[1]}
            />
        );
    }
  },

  _toggle: function(e) {
    if (e) { e.preventDefault(); }
    this.setState({ formOpen: !this.state.formOpen });
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    var fields = serialize(this.refs.form.elements);

    ProfileUtil.updateProfile(fields)
    .then(this._toggle);
  },

  render: function() {
    if (this.state.formOpen) {
      return (
        <form ref="form" onSubmit={this._handleSubmit} >
          {this._editing()}
          <button type="submit">Save</button>
          <button onClick={this._toggle}>Cancel</button>
        </form>
      );
    } else {
      return (
        <div className='edit-button' onClick={this._toggle} />
      );
    }
  }

});

module.exports = Edit;

function serialize (array) {
  var inputs = Array.prototype.slice.call(array);
  var serialized = [];

  inputs.forEach(function(el) {
    if (el.tagName === "INPUT" && el.type !== "file") {
      serialized.push(el.name + '=' + el.value);
    }
  });

  return serialized.join('&');
}
