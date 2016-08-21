var React = require('react');
var PropTypes = React.PropTypes;

var WorkExperience = React.createClass({

  getInitialState: function() {
    return {
      editing: false
    };
  },

  _edit: function() {
    this.setState({ editing: true });
  },

  _cancel: function() {
    this.setState({ editing: false });
  },

  _editButton: function() {
    if (this.props.editable) {
      return (
        <div
          className='work-experience-edit-button'>
          <i className='fa fa-pencil' onClick={this._edit}>
          </i>
        </div>
      );
    }
  },

  render: function() {
    if (this.state.editing) {
      return (
        <WorkExperienceForm workExperience={this.props.workExperience} />
      );
    } else {
      return (
        <li key={i}>
          <div>
            <h4>{workExperience.position}</h4>
            {this.editButton()}
          </div>
          <div>
            <h5>{workExperience.company}</h5>
            {this.editButton()}
          </div>
          <div>
            <span>
              <time>{workExperience.start}</time>" - "<time>{workExperience.end}</time>
            </span>
            <span>{workExperience.location}</span>
            {this.editButton()}
          </div>
          <div>
            <p>{workExperience.description}</p>
            {this.editButton()}
          </div>
        </li>
      );
    }
  }
});

module.exports = WorkExperience;
