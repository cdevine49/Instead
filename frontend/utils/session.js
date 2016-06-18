var SessionActions = require('../actions/session');

SessionUtil = {

  signIn: function (credentials, callback) {
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: credentials,
      success: function (currentUser) {
        SessionActions.currentUser(currentUser);
        callback && callback();
      },
      error: function () {
        console.log('SessionUtil#signIn error');
      },
    });
  },

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
      error: function () {
        console.log('SessionUtil#fetchCurrentUser error');
      },
      complete: function () {
        completion && completion();
      }
    });
  },

};

module.exports = UserUtil;
