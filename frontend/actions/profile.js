var AppDispatcher = require('../dispatcher/appDispatcher');
var ProfileConstants = require('../constants/profile');

ProfileActions = {

  receiveProfile: function (profile) {
    var action = {
      actionType: ProfileConstants.RECEIVE_PROFILE,
      profile: profile
    };

    AppDispatcher.dispatch(action);
  }

};

module.exports = ProfileActions;
