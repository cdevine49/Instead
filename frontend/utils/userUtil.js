var UserActions = require('../actions/user');
var SessionActions = require('../actions/session');

UserUtil = {

  signUp: function (credentials, callback) {
    $.ajax({
      type: "POST",
      url: "/api/users",
      dataType: "json",
      data: {user: credentials},
      success: function (currentUser) {
        SessionActions.currentUser(currentUser);
        callback && callback();
      },
      error: function () {
        console.log('UserUtil#signUp error');
      },
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
