var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/appDispatcher');
var JobStore = new Store(AppDispatcher);

var JobConstants = require('../constants/job');


JobStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case JobConstants.CURRENT_USER:
      _currentUser = payload.currentUser;
      _currentUserFetched = true;
      JobStore.__emitChange();
      break;
    case JobConstants.LOGOUT:
      _currentUser = null;
      _currentUserFetched = false;
      JobStore.__emitChange();
      break;
  }
};

module.exports = JobStore;
