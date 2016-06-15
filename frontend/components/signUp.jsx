var React = require('react');
var UserUtil = require('../utils/userUtil');
var UserStore = require('../stores/userStore');

var SignUp = React.createClass({

  getInitialState: function() {
    return {
      email: null,
      emailEntered: false,

      password: null,
      passwordEntered: false,

      passwordConfirmation: null,
      passwordConfirmationEntered: false
    };
  },

  _doesEmailExist: function(email) {
    UserUtil.doesEmailExist();
  },

  render: function() {
    return (
      <div className="sign-up-form">
        <h1>Create Your Instead Account</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="youremail@email.com"
            className="Use the user store to set: UserStore.usernameExists()"
            onChange={this._update.bind(null, "Email")}
            onFocus={}
            onBlur={this.doesEmailExist.bind(null, this.state.email)}
            ></input>
        </form>
      </div>
    );
  }

});

module.exports = SignUp;
