var React = require('react');
var Header = require('./header');

var App = React.createClass({

  render: function() {
    return (
      <main className='app'>
        <Header />
        {this.props.children}
      </main>
    );
  }

});

module.exports = App;
