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
    ProfileUtil.updateProfile(formData);
  },

  render: function() {
    return (
      <div className="profile-pic-wrapper">
        <img
          src={this.props.avatar}
          className="profile-pic"
          onDrop={this._drop}
          onDragEnter={this._stop}
          onDragOver={this._stop}
          />
        <p className="profile-pic-edit">Edit your <br />profile picture</p>
      </div>
    );
  }

});

module.exports = ProfilePic;
