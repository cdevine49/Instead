var AppDispatcher = require('../dispatcher/appDispatcher');
var CropperConstants = require('../constants/cropper');

export const CropperActions = {

  receiveTempAvatarURL: function (url) {
    var action = {
      actionType: CropperConstants.RECEIVE_TEMP_AVATAR_URL,
      url: url
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
