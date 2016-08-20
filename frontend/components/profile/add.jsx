var React = require('react');
var ProfileUtil = require('../../utils/profile');
var EditName = require('./edit/editName');
var EditWorkExperience = require('./edit/editWorkExperience');

var Edit = React.createClass({

  getInitialState: function() {
    return {
      formOpen: false
    };
  },

  _adding: function() {
    switch (this.props.field) {
      case "Name":
        return (
          <EditName
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            />
        );
      case "WorkExperience":
        return (
          <EditWorkExperience
            position={this.props.position}
            company={this.props.company}
            start={this.props.start}
            end={this.props.end}
            location={this.props.location}
            description={this.props.description}
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
    var fields = $(this.refs.form.elements).serialize();

    ProfileUtil.updateProfile(fields, true)
    .then(this._toggle);
  },

  render: function() {
    if (this.state.formOpen) {
      return (
        <form ref="form" onSubmit={this._handleSubmit} >
          {this._adding()}
          <button type="submit">Save</button>
          <button onClick={this._toggle}>Cancel</button>
        </form>
      );
    } else {
      return (
        <div className='add-button' onClick={this._toggle} />
      );
    }
  }
});

module.exports = Edit;
