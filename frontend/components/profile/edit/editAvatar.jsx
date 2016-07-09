var React = require('react');

var EditAvatar = React.createClass({

  getInitialState: function() {
    return {
      file: null
    };
  },

  _onChange: function() {
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function () { this.setState({ file: file }); }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.resetFile();
    }
  },

  render: function() {
    return (
      <div>
        <label htmlFor="avatar">Avatar</label>
        <input
          type="file"
          id="avatar"
          name="user_profile[avatar]"
          className=""
          onChange={this._onChange}
        />
      </div>
    );
  }

});

module.exports = EditAvatar;
