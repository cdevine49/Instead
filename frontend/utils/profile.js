var ProfileActions = require('../actions/session');
var ProfileAction = require('../stores/session');

ProfileUtil = {

  fetchProfile: function (currentUserId) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "GET",
        url: "/api/user_profiles",
        dataType: "json",
        data: currentUserId,
        success: function (profile) {
          ProfileActions.receiveProfile(profile);
          resolve();
        },
        error: function (response) {
          reject(response);
        },
      });
    });
  }

};

module.exports = ProfileUtil;
