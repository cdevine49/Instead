var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/appDispatcher');
var ProfileStore = new Store(AppDispatcher);

var ProfileConstants = require('../constants/profile');

var _profile,
    _newAvatar;

ProfileStore.profile = function() {
  return _profile;
};

ProfileStore.newAvatar = function() {
  return _newAvatar.image;
};

ProfileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ProfileConstants.RECEIVE_PROFILE:
      _profile = payload.profile;
      ProfileStore.__emitChange();
      break;
    case ProfileConstants.RECEIVE_TEMP_PROFILE_PIC:
      _newAvatar = payload.photo;
      ProfileStore.__emitChange();
      break;
  }
};

module.exports = ProfileStore;
