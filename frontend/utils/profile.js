var ProfileActions = require('../actions/profile');

export const ProfileUtil = {

  fetchProfile: function (user_id) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "GET",
        url: "/api/user_profile/",
        dataType: "json",
        data: {user_id: user_id},
        success: function (profile) {
          ProfileActions.receiveProfile(profile);
          resolve();
        },
        error: function (response) {
          reject(response);
        },
      });
    });
  },

  updateProfile: function (data) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "PATCH",
        url: "/api/user_profile/",
        dataType: "json",
        data: data,
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
