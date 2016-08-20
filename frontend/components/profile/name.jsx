var React = require('react');
var PropTypes = React.PropTypes;
var Edit = require('./edit');

var Name = React.createClass({

  getInitialState: function() {
    return {
      editing: false
    };
  },

  edit: function() {
    this.setState({ editing: true });
  },

  closeEdit: function() {
    this.setState({ editing: false });
  },

  _editButton: function() {
    if (this.props.editable) {
      return (
        <div
          className='profile-card-edit-button'>
          <i className='fa fa-pencil' onClick={this.edit}>
          </i>
        </div>
      );
    }
  },

  _editForm: function() {
    if (this.props.editable && this.state.editing) {
      return ( <Edit
                  field="Name"
                  close={this.closeEdit}
                  firstName={this.props.firstName}
                  lastName={this.props.lastName}
                />
            );
    }
  },

  render: function() {
    return (
      <div className='profile-card-name-wrapper profile-card-wrapper'>
        <h1 className='profile-card-name profile-card-wrapped'>{this.props.firstName + " " + this.props.lastName}</h1>
        <div className='profile-card-edit-box'>
          {this._editButton()}
          {this._editForm()}
        </div>
      </div>
    );
  }

});

module.exports = Name;
