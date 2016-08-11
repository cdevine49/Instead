var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/appDispatcher');
var CropperStore = new Store(AppDispatcher);

var CropperConstants = require('../constants/cropper');

var _URL;

CropperStore.URL = function() {
  return _URL;
};

CropperStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CropperConstants.RECEIVE_TEMP_AVATAR_URL:
      _URL = payload.url;
      CropperStore.__emitChange();
      break;
    case CropperConstants.DELETE_TEMP_PROFILE_PIC:
      _URL = null;
      CropperStore.__emitChange();
      break;
  }
};

module.exports = CropperStore;
