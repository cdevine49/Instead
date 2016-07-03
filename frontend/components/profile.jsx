var React = require('react');
var SessionStore = require('../stores/session');
var ProfileUtil = require('../utils/profile');
var ProfileStore = require('../stores/profile');

var Profile = React.createClass({

  getInitialState: function() {
    return {
      profile: null
    };
  },

  componentDidMount: function() {
    ProfileUtil.fetchProfile({ id: SessionStore.currentUser.id });
    this.profileStoreToken = ProfileStore.addListener(this._onChange);
  },

  componentWillUnMount: function() {
    this.profileStoreToken.remove();
  },

  _onChange: function() {
    this.setState({ profile: ProfileStore.profile() });
  },

  // <ProfileSidebar />
  // <Skills />
  // <WorkExperience />
  // <Education />
  // <About />
  render: function() {
    return (
      <main>
        <span>{this.state.profile.first_name} + " " + {this.state.profile.last_name}</span>
      </main>
    );
  }

});

module.exports = Profile;
