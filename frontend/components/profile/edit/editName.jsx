var React = require('react');
var PropTypes = React.PropTypes;

var EditName = React.createClass({

  render: function() {
    return (
      <div className='profile-card-edit-name'>
        <label htmlFor="first_name"></label>
        <input
          type="text"
          id="first_name"
          name='user_profile[first_name]'
          defaultValue={this.props.firstName}
          placeholder="First"
          className=""
        />

        <label htmlFor="last_name"></label>
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
