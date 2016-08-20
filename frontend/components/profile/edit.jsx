var React = require('react');
var ProfileUtil = require('../../utils/profile');
var EditName = require('./edit/editName');
var EditHeadline = require('./edit/editHeadline');
var EditWorkExperience = require('./edit/editWorkExperience');

var Edit = React.createClass({

  _editing: function() {
    switch (this.props.field) {
      case "Name":
        return (
          <EditName
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            />
        );
      case "Headline":
        return (
          <EditHeadline
            headline={this.props.headline}
            />
        );
    }
  },

  _toggle: function(e) {
    if (e) { e.preventDefault(); }
    this.props.close();
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    var fields = $(this.refs.form.elements).serialize();
    ProfileUtil.updateProfile(fields)
    .then(this.props.close);
  },

  render: function() {
    return (
      <form className='profile-card-edit-form' ref="form" onSubmit={this._handleSubmit} >
        <strong className='profile-card-edit-form-pointer'></strong>
        {this._editing()}
        <button type="submit">Save</button>
        <button onClick={this._toggle}>Cancel</button>
      </form>
    );
  },
});

module.exports = Edit;
