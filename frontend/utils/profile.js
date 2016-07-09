var ProfileActions = require('../actions/profile');

ProfileUtil = {

  fetchProfile: function (id) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "GET",
        url: "/api/user_profile/",
        dataType: "json",
        data: {id: id},
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

  updateProfile: function (fields) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "PATCH",
        url: "/api/user_profile/",
        dataType: "json",
        data: fields,
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

  uploadProfilePic: function (data) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "PATCH",
        url: "/api/user_profile/upload",
        processData: false,
        contentType: false,
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
