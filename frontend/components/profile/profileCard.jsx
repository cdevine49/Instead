var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../stores/session');
var ProfilePic = require('./profilePic');
var Edit = require('./edit');
var Name = require('./name');
var Headline = require('./headline');

var ProfileCard = React.createClass({

  render: function() {
    var editable = this.props.profile.user_id === SessionStore.currentUser().id;
    var firstName = this.props.profile.first_name;
    var lastName = this.props.profile.last_name;
    var headline = this.props.profile.headline;
    var about = this.props.profile.about;
    var avatar = this.props.profile.avatar;

    return (
      <div className='profile-card'>
        <ProfilePic avatar={avatar} />
        <div className='profile-overview'>
          <Name editable={editable} firstName={firstName} lastName={lastName} />
          <Headline editable={editable} headline={headline} />
        </div>
      </div>
    );
  }

});

module.exports = ProfileCard;
