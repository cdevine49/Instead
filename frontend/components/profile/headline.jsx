var React = require('react');
var PropTypes = React.PropTypes;
var Edit = require('./edit');

var Headline = React.createClass({

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
                  field="Headline"
                  close={this.closeEdit}
                  headline={this.props.headline}
                />
            );
    }
  },

  render: function() {
    return (
      <div className='profile-card-headline-wrapper profile-card-wrapper'>
        <h1 className='profile-card-headline profile-card-wrapped'>{this.props.headline}</h1>
        <div className='profile-card-edit-box'>
          {this._editButton()}
          {this._editForm()}
        </div>
      </div>
    );
  }

});

module.exports = Headline;
