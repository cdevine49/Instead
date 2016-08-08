var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/appDispatcher');
var CropperStore = new Store(AppDispatcher);

var CropperConstants = require('../constants/cropper');

var _newAvatar;

CropperStore.newAvatar = function() {
  return _newAvatar.image;
};

CropperStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CropperConstants.RECEIVE_TEMP_PROFILE_PIC:
      _newAvatar = payload.photo;
      CropperStore.__emitChange();
      break;
    case CropperConstants.DELETE_TEMP_PROFILE_PIC:
      _newAvatar = null;
      CropperStore.__emitChange();
      break;
  }
};

module.exports = CropperStore;
