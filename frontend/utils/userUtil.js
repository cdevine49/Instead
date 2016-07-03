var UserActions = require('../actions/user');
var SessionActions = require('../actions/session');

UserUtil = {

  signUp: function (credentials) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "POST",
        url: "/api/users",
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

  checkEmailUnique: function (email) {
    $.ajax({
      type: "GET",
      url: "/api/users/unique",
      dataType: "json",
      data: email,
      success: function (boolean) {
        UserActions.emailUnique(boolean);
      },
      error: function () {
        console.log('UserUtil#findUser error');
      }
    });
  }

};

module.exports = UserUtil;
