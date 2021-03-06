var AppDispatcher = require('../dispatcher/appDispatcher');
var UserConstants = require('../constants/userConstants');

export const UserActions = {

  emailUnique: function (boolean) {
    var action = {
      actionType: UserConstants.EMAIL_UNIQUE,
      boolean: boolean
    };

    AppDispatcher.dispatch(action);
  }

};

module.exports = UserActions;
