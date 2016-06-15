var AppDispatcher = require('../dispatcher/appDispatcher');
var UserConstants = require('../constants/UserConstants');

UserActions = {

  foundUser: function (boolean) {
    var action = {
      actionType: UserConstants.USER_FOUND,
      boolean: boolean
    };

    AppDispatcher.dispatch(action);
  }

};

module.exports = UserActions;
