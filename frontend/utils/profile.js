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

  updateProfile: function (data, bool) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "PATCH",
        url: "/api/user_profile/",
        dataType: "json",
        processData: bool,
        contentType: bool,
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
  },

  createTempProfilePic: function (data) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "POST",
        url: "/api/photos",
        dataType: "json",
        processData: false,
        contentType: false,
        data: data,
        success: function (photo) {
          ProfileActions.receiveTempProfilePic(photo);
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
