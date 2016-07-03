var React = require('react');
var SessionUtil = require('../utils/session');
var LogInError = require('./login/error');
var Link = require('react-router').Link;

var LogIn = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      email: '',
      emailEntered: false,

      password: '',
      passwordEntered: false
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
    }
  },

  _entered: function(option, boolean) {
    switch (option) {
    case "email":
      this.setState({emailEntered: boolean});
      break;
    case "password":
      this.setState({passwordEntered: boolean});
      break;
    }
  },

  _handleSubmit: function() {
    var success = function () { this.context.router.push("/"); }.bind(this);

    SessionUtil.signIn({user: {email: this.state.email, password: this.state.password}})
    .then(success)
    .catch(function (response) {console.log("failed " + response);});
  },

  render: function() {

    var email = this.state.email;
    var password = this.state.password;
    var confirmation = this.state.confirmation;

    var emailError = this.state.emailEntered;
    var passwordError = this.state.passwordEntered;

    var emailEmpty = emailError && email === "";

    var emailInvalid = emailError && email !== "" && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

    var passwordEmpty = passwordError && password === "";

    return (
      <main className="sign-in-form">
        <h1>Log In</h1>
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

        <input
          type="submit"
          value="Log In" />

        </form>
        <Link to={'/signup/'}>Create Account</Link>
      </main>
    );
  }

});

// Get the Create Account and Log In buttons to do client side validations

module.exports = LogIn;
