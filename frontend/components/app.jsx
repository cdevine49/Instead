var React = require('react');

var App = React.createClass({

  render: function() {
    return (
      <main>
        <h1>Instead</h1>
        {this.props.children}
      </main>
    );
  }

});

module.exports = App;
