var React = require('react');
var UserUtil = require('../utils/userUtil');
var UserStore = require('../stores/session');

var SignUp = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

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

  componentDidMount: function() {
    this.sessionStoreToken = SessionStore.addListener();
  },

  componentWillUnMount: function() {
    this.sessionStoreToken.remove();
  },

  _update: function(option, e) {
    switch (option) {
    case "email":
      this.setState({email: e.currentTarget.value});
      break;
    case "password":
      this.setState({password: e.currentTarget.value});
      break;
    case "passwordConfirmation":
      this.setState({passwordConfirmation: e.currentTarget.value});
      break;
    }
  },

  _entered: function(option, boolean) {
    switch (option) {
    case "email":
      this.setState({emailEntered: boolean});
      if (boolean) { UserUtil.checkEmailUnique({email: email}); }
      break;
    case "password":
      this.setState({passwordEntered: boolean});
      break;
    case "passwordConfirmation":
      this.setState({passwordConfirmationEntered: boolean});
      break;
    }
  },

  _handleSubmit: function() {
    UserUtil.signUp({email: this.state.email, password: this.state.password}, function () {
      router.push("/");
    });
  },

  /* Find out if possible to get current blur or focus state of input field and use for class */

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
            className="Use the user store to set: this.state.emailEntered && UserStore.emailExists(this.state.email)"
            onChange={this._update.bind(null, "email")}
            onFocus={this._entered.bind(null, "email", false)}
            onBlur={this._entered.bind(null, "email", true)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className=""
            onChange={this._update.bind(null, "password")}
            onFocus={this._entered.bind(null, "passwordEntered", false)}
            onBlur={this._entered.bind(null, "passwordEntered", true)}
          />

          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirmation"
            className=""
            onChange={this._update.bind(null, "passwordConfirmation")}
            onFocus={this._entered.bind(null, "passwordConfirmationEntered", false)}
            onBlur={this._entered.bind(null, "passwordConfirmationEntered", true)}
          />

        <button onSubmit={this._handleSubmit}>Create Account</button>

        </form>
      </div>
    );
  }

});

module.exports = SignUp;
