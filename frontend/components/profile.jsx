var React = require('react');
var SessionStore = require('../stores/session');
var ProfileUtil = require('../utils/profile');
var ProfileStore = require('../stores/profile');
var ProfilePic = require('./profile/profilePic');
var Item = require('./profile/item');

var Profile = React.createClass({

  getInitialState: function() {
    return {
      profile: null
    };
  },

  componentDidMount: function() {
    ProfileUtil.fetchProfile(this.props.params.id);
    this.profileStoreToken = ProfileStore.addListener(this._onChange);
  },

  componentWillUnMount: function() {
    this.profileStoreToken.remove();
  },

  _onChange: function() {
    this.setState({ profile: ProfileStore.profile() });
  },

  render: function() {
    if (this.state.profile) {
      var firstName = this.state.profile.first_name;
      var lastName = this.state.profile.last_name;
      var birthday = this.state.profile.birthday;
      var about = this.state.profile.about;
      var avatar = this.state.profile.avatar;
      var editable = this.state.profile.user_id === SessionStore.currentUser().id;
      return (
        <main>
          Profile
          <ProfilePic avatar={avatar} />
          <Item editable={editable} field="Name" input={firstName + " " + lastName} />
          <Item editable={editable} field="Birthday"   />
          <Item editable={editable} field="About"  />
        </main>
      );
    } else {
      return (<p>...Loading</p>);
    }
  }

});

module.exports = Profile;
