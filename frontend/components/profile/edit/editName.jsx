var React = require('react');
var PropTypes = React.PropTypes;

var EditName = React.createClass({

  // _onChange: function(e) {
  //   this.setState({file: e.currentTarget.files[0]});
  // },

  render: function() {
    return (
      <div>
        <label htmlFor="first_name">First</label>
        <input
          type="text"
          id="first_name"
          name='user_profile[first_name]'
          defaultValue={this.props.firstName}
          placeholder="First"
          className=""
        />

        <label htmlFor="last_name">Last</label>
        <input
          type="text"
          id="last_name"
          name='user_profile[last_name]'
          defaultValue={this.props.lastName}
          placeholder="Last"
          className=""
        />

      </div>
    );
  }

});

module.exports = EditName;
