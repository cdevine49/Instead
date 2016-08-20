var React = require('react');
var PropTypes = React.PropTypes;

var WorkExperience = React.createClass({

  render: function() {
    return (
      <li>
        <h4>{this.props.details.position}</h4>
        <h5>{this.props.details.company}</h5>
        <span>
          <time>{this.props.details.start}</time>" - "<time>{this.props.details.end}</time>
        </span>
        <span>{this.props.details.location}</span>
        <p>{this.props.details.description}</p>
      </li>
    );
  },

  getDefaultProps: function() {
    return {
      position: "",
      company: "",
      start: "",
      end: "",
      location: "",
      description: ""
    };
  }

});

module.exports = WorkExperience;
