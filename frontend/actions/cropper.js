var AppDispatcher = require('../dispatcher/appDispatcher');
var CropperConstants = require('../constants/cropper');

CropperActions = {

  receiveTempProfilePic: function (photo) {
    var action = {
      actionType: CropperConstants.RECEIVE_TEMP_PROFILE_PIC,
      photo: photo
    };

    AppDispatcher.dispatch(action);
  },

  deleteTempProfilePic: function() {
    var action = {
      actionType: CropperConstants.DELETE_TEMP_PROFILE_PIC
    };

    AppDispatcher.dispatch(action);
  }

};

module.exports = CropperActions;
