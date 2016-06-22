var React = require('react');
var SessionUtil = require('../../utils/session');

var SignOut = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <button onClick={this._onSignOut}>Logout</button>
    );
  },

  _onSignOut: function () {
    var success = function () { this.context.router.push("/login"); }.bind(this);

    SessionUtil.signOut()
    .then(success)
    .catch(function (response) {console.log("failed " + response);});
  }

});

module.exports = SignOut;
