var SessionActions = require('../actions/session');

SessionUtil = {

  signOut: function () {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "DELETE",
        url: "/api/session",
        dataType: "json",
        success: function () {
          SessionActions.signOut();
          resolve();
        },
        error: function () {
          reject();
        },
      });
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
