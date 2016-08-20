var React = require('react');
var PropTypes = React.PropTypes;

var EditWorkExperience = React.createClass({

  render: function() {
    return (
      <div>
        <label htmlFor="position">Position</label>
        <input
          type="text"
          id="first_name"
          name='work_experiences[position]'
          defaultValue={this.props.position}
          placeholder="First"
          className=""
        />

      <label htmlFor="company">Company</label>
        <input
          type="text"
          id="last_name"
          name='work_experiences[company]'
          defaultValue={this.props.company}
          placeholder="Last"
          className=""
        />
      <label htmlFor="start">Start Date</label>
        <input
          type="text"
          id="last_name"
          name='work_experiences[start]'
          defaultValue={this.props.company}
          placeholder="Last"
          className=""
        />
      <label htmlFor="end">End Date</label>
        <input
          type="text"
          id="last_name"
          name='work_experiences[end]'
          defaultValue={this.props.company}
          placeholder="Last"
          className=""
        />
      </div>
    );
  }

});

module.exports = EditWorkExperience;
