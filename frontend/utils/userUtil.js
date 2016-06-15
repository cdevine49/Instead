var UserActions = require('../actions/userActions');

UserUtil = {

  signUp: function (credentials) { /* No callbacks check tumblr */
    $.ajax({
      type: "POST",
      url: "/api/users",
      dataType: "json",
      data: {user: credentials},
      success: function (currentUser) {
        ApiActions.currentUserReceived(currentUser);
        // callback && callback();
      },
      error: function () {
        console.log('ApiUtil#signin error');
      },
    });
  },

  signIn: function (credentials, callback) {
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

  signOut: function () {
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

  findUser: function (email) {
    $.ajax({
      type: "GET",
      url: "/api/users",
      dataType: "json",
      data: email,
      success: function (boolean) {
        UserActions.foundUser(boolean);
      },
      error: function () {
        console.log('UserUtil#findUser error');
      }
    });

  }

};

module.exports = UserUtil;
