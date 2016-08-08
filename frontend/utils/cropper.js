var CropperActions = require('../actions/cropper');

CropperUtil = {

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
          CropperActions.receiveTempProfilePic(photo);
          resolve();
        },
        error: function (response) {
          reject(response);
        },
      });
    });
  },

  clearCropperStore: function() {
    CropperActions.deleteTempProfilePic();
  }

};

module.exports = CropperUtil;
