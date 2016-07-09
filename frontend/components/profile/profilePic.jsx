var React = require('react');
var Dropzone = require('react-dropzone');

var ProfilePic = React.createClass({

  getInitialState: function() {
    return {
      imageUrl: '',
      imageFile: null
    };
  },

  _drop: function(e) {
    this._stop(e);
    this._upload(e.dataTransfer.files);
  },

  _stop: function(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  _upload: function(file) {
    var formData = new FormData();
    formData.append("user_profile[avatar]", file[0]);
    ProfileUtil.uploadProfilePic(formData);
  },

  render: function() {
    return (
      <img
        src={this.props.avatar}
        onDrop={this._drop}
        onDragEnter={this._stop}
        onDragOver={this._stop}
        />
    );
  }

});

module.exports = ProfilePic;
