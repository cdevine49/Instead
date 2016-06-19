var React = require('react');

var App = React.createClass({

  render: function() {
    return (
      <main>
        <h1>Instead</h1>
        <Header />
        {this.props.children}
      </main>
    );
  }

});

module.exports = App;
