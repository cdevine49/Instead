var React = require('react');
var PropTypes = React.PropTypes;
var WorkExperience = require('./workExperience');
var WorkExperienceForm = require('./workExperienceForm');

var WorkExperiences = React.createClass({

  getInitialState: function() {
    return {
      _create: false
    };
  },

  _create: function() {
    this.setState({ _create: true });
  },

  _close: function() {
    this.setState({ _create: false });
  },

  addWorkExperience: function() {
    if (this.state._create) { return ( <WorkExperienceForm /> ); }
  },

  render: function() {

    var workExperiences = this.props.workExperiences.map(function(we, i) {
      <WorkExperience workExperience={we} />;
    });

    return (
      <div>
        <header>
          <h2>Experience</h2>
          <button onClick={this._create}>Add Position</button>
        </header>
        {this.addWorkExperience()}
        <ul>
          {workExperiences}
        </ul>
      </div>
    );
  },

  getDefaultProps: function() {
    return {
      workExperiences: []
    };
  }

});

module.exports = WorkExperiences;
