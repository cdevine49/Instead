var SessionActions = require('../actions/session');

SessionUtil = {

  signOut: function () {
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      dataType: "json",
      success: function () {
        SessionActions.logout();
      },
      error: function () {
        console.log('SessionUtil#signOut error');
      },
    });
  },

  findCurrentUser: function (completion) {
    $.ajax({
      type: "GET",
      url: "/api/session",
      dataType: "json",
      success: function (currentUser) {
        SessionActions.currentUser(currentUser);
      },
      error: function (message) {
        
      },
      complete: function () {
        completion && completion();
      }
    });
  },

};

module.exports = SessionUtil;
