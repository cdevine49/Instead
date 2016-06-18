var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/appDispatcher');
var UserStore = new Store(AppDispatcher);

var UserConstants = require('../constants/userConstants');

var _taken;

UserStore.emailAvailable = function () {
  return _taken;
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.EMAIL_UNIQUE:
      _taken = payload.boolean;
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;
