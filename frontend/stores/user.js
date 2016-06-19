var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/appDispatcher');
var UserStore = new Store(AppDispatcher);

var UserConstants = require('../constants/userConstants');

var _unique = true;

UserStore.emailAvailable = function () {
  return _unique;
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.EMAIL_UNIQUE:
      _unique = payload.boolean;
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;
