var React = require('react');
var ProfileUtil = require('../utils/profile');
var ProfileStore = require('../stores/profile');
var ProfileCard = require('./profile/profileCard');

var Profile = React.createClass({

  getInitialState: function() {
    return {
      profile: null,
      addWorkExperience: false
    };
  },

  componentDidMount: function() {
    ProfileUtil.fetchProfile(this.props.params.id);
    this.profileStoreToken = ProfileStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.profileStoreToken.remove();
  },

  _onChange: function() {
    this.setState({ profile: ProfileStore.profile() });
  },

  add: function(type, bool) {
    switch (type) {
      case "WorkExperience":
        this.setState({ addWorkExperience: bool });
      break;
    }
  },

  addWorkExperience: function() {
    if (this.state.addWorkExperience) {
      return(
        <Edit field="WorkExperience" type="create" />
      );
    }
  },

  render: function() {
    if (this.state.profile) {
      var workExperiences = this.state.profile.work_experiences.map(function(we, i) {
        <WorkExperience key={i} editable={editable}
          position={we.position}
          company={we.company}
          start={we.start}
          end={we.end}
          location={we.location}
          description={we.description}
          />;
      });
      return (
        <main className='profile'>
          <ProfileCard profile={this.state.profile} />
          <div>
            <header>
              <h2>Experience</h2>
              <button onClick={this.add.bind(this, "WorkExperience", true)}>Add Position</button>
            </header>
            {this.addWorkExperience()}
            <ul>
              {workExperiences}
            </ul>
        </div>
        </main>
      );
    } else {
      return (<p>...Loading</p>);
    }
  }

});

module.exports = Profile;
