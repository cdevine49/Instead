SessionActions = {

  currentUser: function (currentUser) {
    var action = {
      actionType: SessionConstants.CURRENT_USER,
      currentUser: currentUser
    };

    AppDispatcher.dispatch(action);
  }

};

module.exports = SessionActions;
