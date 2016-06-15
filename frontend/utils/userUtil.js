var UserActions = require('../actions/userActions');

UserUtil = {
  
  signup: function (credentials, callback) {
    $.ajax({
      type: "POST",
      url: "/api/users",
      dataType: "json",
      data: {user: credentials},
      success: function (currentUser) {
        ApiActions.currentUserReceived(currentUser);
        callback && callback();
      },
      error: function () {
        console.log('ApiUtil#signin error');
      },
    });
  },

  login: function (credentials, callback) {
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: credentials,
      success: function (currentUser) {
        ApiActions.currentUserReceived(currentUser);
        callback && callback();
      },
      error: function () {
        console.log('ApiUtil#login error');
      },
    });
  },

  logout: function () {
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      dataType: "json",
      success: function () {
        ApiActions.logout();
      },
      error: function () {
        console.log('ApiUtil#logout error');
      },
    });
  },

  fetchCurrentUser: function (completion) {
    $.ajax({
      type: "GET",
      url: "/api/session",
      dataType: "json",
      success: function (currentUser) {
        ApiActions.currentUserReceived(currentUser);
      },
      error: function () {
        console.log('ApiUtil#fetchCurrentUser error');
      },
      complete: function () {
        completion && completion();
      }
    });
  },

};

module.exports = UserUtil;
