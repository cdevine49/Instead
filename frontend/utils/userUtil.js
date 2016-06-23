var UserActions = require('../actions/user');
var SessionActions = require('../actions/session');

UserUtil = {

  signIn: function (url, credentials, callback) {
    return new Promise( function(resolve, reject) {
      $.ajax({
        type: "POST",
        url: "/api/" + url,
        dataType: "json",
        data: {user: credentials},
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

  checkEmailUnique: function (email, callback) {
    $.ajax({
      type: "GET",
      url: "/api/users/unique",
      dataType: "json",
      data: {user: email},
      success: function (boolean) {
        UserActions.emailUnique(boolean);
        callback && callback();
      },
      error: function () {
        console.log('UserUtil#findUser error');
      }
    });
  }

};

module.exports = UserUtil;
