var React = require('react');

var UserUtil = require('../utils/userUtil');
var UserStore = require('../stores/user');

var LogInError = require('./login/error');

String.prototype.empty = function () {
  return this.toString() === "";
};

var LogIn = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      email: '',
      emailEntered: false,

      password: '',
      passwordEntered: false,

      confirmation: '',
      confirmationEntered: false,

      url: "session"
    };
  },

  _update: function(option, e) {
    var input = e.currentTarget.value;
    switch (option) {
    case "email":
      this.setState({email: input});
      break;
    case "password":
      this.setState({password: input, confirmation: "", confirmationEntered: false});
      break;
    case "confirmation":
      this.setState({confirmation: input});
      break;
    case "url":
      this.setState({ url: this.state.url === "session" ? "users" : "session"});
    }
  },

  _entered: function(option, boolean) {
    switch (option) {
    case "email":
    var callback = this.setState({emailEntered: boolean});
      if (boolean) {
        UserUtil.checkEmailUnique({email: this.state.email}, callback);
      }
      break;
    case "password":
      this.setState({passwordEntered: boolean});
      break;
    case "confirmation":
      this.setState({confirmationEntered: boolean});
      break;
    }
  },

  _handleSubmit: function() {
    var success = function () { this.context.router.push("/"); }.bind(this);

    UserUtil.signIn(this.state.url, {email: this.state.email, password: this.state.password})
    .then(success)
    .catch(function (response) {console.log("failed " + response);});
  },

  render: function() {

    var email = this.state.email;
    var password = this.state.password;
    var confirmation = this.state.confirmation;
    var url = this.state.url;
    var loggingIn = url === "session";

    var emailError = this.state.emailEntered;
    var passwordError = !loggingIn && this.state.passwordEntered;
    var confirmError = !loggingIn && this.state.confirmationEntered;

    var emailEmpty = emailError && email.empty();
    var emailTaken = !loggingIn && emailError && !UserStore.emailAvailable();
    var emailInvalid = emailError && !email.empty() && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

    var passwordEmpty = passwordError && password.empty();
    var passwordShort = !loggingIn && passwordError && !password.empty() && password.length < 8;
    var passwordLong = !loggingIn && passwordError && password.length > 100;

    var confirmationEmpty = confirmError && password.empty() && confirmation.empty();
    var noMatch = confirmError && password !== confirmation;

    return (
      <main className="sign-up-form">
        <h1>Create Your Instead Account</h1>
        <form onSubmit={this._handleSubmit} noValidate>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="youremail@email.com"
            className="Use the user store to set: this.state.emailEntered && UserStore.emailExists(this.state.email)"
            onChange={this._update.bind(null, "email")}
            onFocus={this._entered.bind(null, "email", false)}
            onBlur={this._entered.bind(null, "email", true)}
          />
        <LogInError toggle={emailEmpty} message={"You can\'t leave this empty"} />
        <LogInError toggle={emailTaken} message={"Someone already has that username. Try another?"} />
        <LogInError toggle={emailInvalid} message={"You\'re email doesn\'t look quite right"} />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            className=""
            onChange={this._update.bind(null, "password")}
            onFocus={this._entered.bind(null, "password", false)}
            onBlur={this._entered.bind(null, "password", true)}
          />

        <LogInError toggle={passwordEmpty} message={"You can\'t leave this empty"} />
        <LogInError toggle={passwordShort} message={"Short passwords are easy to guess. Try one with at least 8 characters."} />
        <LogInError toggle={passwordLong} message={"Must have at most 100 characters"} />

          <label
            htmlFor="confirmation"
            className={url === "users" ? "active" : "hidden"}
            >Confirm Password</label>

          <input
            type="password"
            id="confirmation"
            value={confirmation}
            className={url === "users" ? "active" : "hidden"}
            onChange={this._update.bind(null, "confirmation")}
            onFocus={this._entered.bind(null, "confirmation", false)}
            onBlur={this._entered.bind(null, "confirmation", true)}
          />

        <LogInError toggle={confirmationEmpty} message={"You can\'t leave this empty"} />
        <LogInError toggle={noMatch} message={"These passwords don\'t match. Try again?"} />

        <input
          type="submit"
          value={ url === "session" ? "Log In" : "Create Account" } />

        </form>
        <div onClick={this._update.bind(null, "url")}>{ url === "session" ? "Create Account" : "Log In" }</div>
      </main>
    );
  }

});

module.exports = LogIn;
