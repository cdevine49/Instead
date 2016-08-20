var React = require('react');
var PropTypes = React.PropTypes;

var EditHeadline = React.createClass({

  render: function() {
    return (
      <div>
        <label htmlFor="headline"></label>
        <input
          type="text"
          id="headline"
          name='user_profile[headline]'
          defaultValue={this.props.headline}
          placeholder="Professional Headline"
          className=""
        />
      </div>
    );
  }

});

module.exports = EditHeadline;
