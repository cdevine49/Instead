var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/appDispatcher');
var ProfileStore = new Store(AppDispatcher);

var ProfileConstants = require('../constants/profile');

var _profile;

ProfileStore.profile = function() {
  return _profile;
};

ProfileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ProfileConstants.RECEIVE_PROFILE:
      _profile = payload.profile;
      ProfileStore.__emitChange();
      break;
  }
};

module.exports = ProfileStore;
