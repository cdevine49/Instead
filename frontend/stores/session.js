var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/appDispatcher');
var SessionStore = new Store(AppDispatcher);

var SessionConstants = require('../constants/session');

var _currentUser;
var _currentUserFound = false;


SessionStore.currentUser = function () {
  return _currentUser;
};

SessionStore.isLoggedIn = function () {
  return !!_currentUser;
};

SessionStore.currentUserFound = function () {
  return _currentUserFound;
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.CURRENT_USER:
      _currentUser = payload.currentUser;
      _currentUserFound = true;
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      _currentUser = null;
      _currentUserFound = false;
      SessionStore.__emitChange();
      break;
  }
};

module.exports = SessionStore;
