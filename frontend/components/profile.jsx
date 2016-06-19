var React = require('react');
var ProfileUtil = require('../utils/profile');
var ProfileStore = require('../stores/profile');

var Profile = React.createClass({

  getInitialState: function() {
    return {
      :
    };
  },

  render: function() {
    return (
      <main>
        <ProfileSidebar />
        <Skills />
        <WorkExperience />
        <Education />
        <About />
      </main>
    );
  }

});

module.exports = Profile;
