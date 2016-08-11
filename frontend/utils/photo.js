var PhotoActions = require('../actions/profile');

PhotoUtil = {

  fetchPhoto: function (id) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "GET",
        url: "/api/photo/" + id,
        dataType: "json",
        success: function (photo) {
          PhotoActions.receivePhoto(photo);
          resolve();
        },
        error: function (response) {
          reject(response);
        },
      });
    });
  },

  uploadAvatar: function(params) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "POST",
        url: "api/photos/upload_avatar",
        dataType: "json",
        data: params,
        success: function (photo) {
          console.log("success");
          resolve(response);
        },
        error: function (response) {
          console.log("error");
          reject(response);
        }
      });
    });
  }

};

module.exports = PhotoUtil;
