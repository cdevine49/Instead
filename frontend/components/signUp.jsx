var React = require('react');
var UserUtil = require('../utils/userUtil');
var UserStore = require('../stores/user');
var LogInError = require('./login/error');
var Link = require('react-router').Link;

var SignUp = React.createClass({

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
      confirmationEntered: false
    };
  },

  componentDidMount: function() {
    this.userStoreToken = UserStore.addListener(this._onChange);
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
    }
  },

  _entered: function(option, boolean) {
    switch (option) {
    case "email":
      if (boolean && this.state.email !== "") {
        UserUtil.checkEmailUnique({user: {email: this.state.email}});
      } else {
        this.setState({emailEntered: boolean});
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

  _onChange: function () {
    this.setState({emailEntered: true});
  },

  _handleSubmit: function() {
    var success = function () { this.context.router.push("/"); }.bind(this);

    UserUtil.signUp({user: {email: this.state.email, password: this.state.password}})
    .then(success)
    .catch(function (response) {console.log("failed " + response);});
  },

  render: function() {

    var email = this.state.email;
    var password = this.state.password;
    var confirmation = this.state.confirmation;

    var emailError = this.state.emailEntered;
    var passwordError = this.state.passwordEntered;
    var confirmError = this.state.confirmationEntered;

    var emailEmpty = emailError && email === "";
    var emailTaken = emailError && email !== "" && UserStore.emailTaken();

    var emailInvalid = emailError && email !== "" && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

    var passwordEmpty = passwordError && password === "";
    var passwordShort = passwordError && password !== "" && password.length < 8;
    var passwordLong = passwordError && password.length > 100;

    var confirmationEmpty = confirmError && password === "" && confirmation === "";
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
            >Confirm Password</label>

          <input
            type="password"
            id="confirmation"
            value={confirmation}
            onChange={this._update.bind(null, "confirmation")}
            onFocus={this._entered.bind(null, "confirmation", false)}
            onBlur={this._entered.bind(null, "confirmation", true)}
          />

        <LogInError toggle={confirmationEmpty} message={"You can\'t leave this empty"} />
        <LogInError toggle={noMatch} message={"These passwords don\'t match. Try again?"} />

        <input
          type="submit"
          value="Create Account" />

        </form>
        <Link to={'/login/'}>Log In</Link>
      </main>
    );
  }

});

module.exports = SignUp;
