var AppDispatcher = require('../dispatcher/appDispatcher');
var SessionConstants = require('../constants/session');

SessionActions = {

  currentUser: function (currentUser) {
    var action = {
      actionType: SessionConstants.CURRENT_USER,
      currentUser: currentUser
    };

    AppDispatcher.dispatch(action);
  },

  signOut: function () {
    var action = {
      actionType: SessionConstants.SIGN_OUT
    };

    AppDispatcher.dispatch(action);
  }

};

module.exports = SessionActions;
