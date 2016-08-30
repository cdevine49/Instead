var SessionActions = require('../actions/session');

export const SessionUtil = {

  signIn: function (credentials) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "POST",
        url: "/api/session",
        dataType: "json",
        data: credentials,
        success: function (currentUser) {
          SessionActions.currentUser(currentUser);
          resolve();
        },
        error: function (response) {
          reject(response);
        },
      });
    });
  },

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
      success: function (response) {
        SessionActions.currentUser(response);
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
