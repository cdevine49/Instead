var React = require('react');
var PropTypes = React.PropTypes;

var EditName = React.createClass({

  render: function() {
    return (
      <fieldset className='profile-card-edit-name'>
        <legend className='profile-card-edit-legend'>Name</legend>

        <label htmlFor="first_name"></label>
        <input
          type="text"
          id="first_name"
          name='user_profile[first_name]'
          defaultValue={this.props.firstName}
          placeholder="First"
          className="name-edit-input first-name-edit-input"
        />

        <label htmlFor="last_name"></label>
        <input
          type="text"
          id="last_name"
          name='user_profile[last_name]'
          defaultValue={this.props.lastName}
          placeholder="Last"
          className="name-edit-input"
        />

    </fieldset>
    );
  }

});

module.exports = EditName;
