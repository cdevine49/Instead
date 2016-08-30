var React = require('react');
var SessionStore = require('../stores/session');
var ProfileUtil = require('../utils/profile');
var ProfileStore = require('../stores/profile');
var ProfileCard = require('./profile/profileCard');
import Background from './profile/Background';

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

  componentWillUnmount: function() {
    this.profileStoreToken.remove();
  },

  _onChange: function() {
    this.setState({ profile: ProfileStore.profile() });
  },

  render: function() {
    if (this.state.profile) {
      var editable = this.state.profile.user_id === SessionStore.currentUser().id;

      return (
        <main className='profile'>
          <ProfileCard profile={this.state.profile} editable={editable} />
          <Background profile ={this.state.profile} editable={editable} />
        </main>
      );
    } else {
      return (<p>...Loading</p>);
    }
  }

});

module.exports = Profile;
