var React = require('react');
var Modal = require('react-modal');
var ModalStyle = require('../../styles/modalStyle');

var ProfileStore = require('../../stores/profile');

var CropperActions = require('../../actions/cropper');
var Cropper = require('./edit/cropper');

var PhotoUtil = require('../../utils/photo');

var ProfilePic = React.createClass({

  getInitialState: function() {
    return {
      modalOpen: false,
      cropperURL: this.props.avatar || null
    };
  },

  openModal: function() {
    ModalStyle.content.opacity = 0;
    this.setState({ modalOpen: true });
  },

  onModalOpen: function() {
    ModalStyle.content.opacity = 100;
  },

  closeModal: function() {
    this.setState({ modalOpen: false });
  },

  _drop: function(e) {
    this._stop(e);
    var file = e.dataTransfer.files[0];
    this._tempAvatarUpload(file);
    this.openModal();
  },

  _onClick: function() {
    // CropperActions.receiveTempAvatarURL(this.props.avatar);
    this.openModal();
  },

  _stop: function(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  _handleUpload: function(data) {
    var params = { photo: data };
    PhotoUtil.uploadAvatar(params);
  },

  _tempAvatarUpload: function(file) {
    var reader = new FileReader();

    reader.onloadend = function() {
      // CropperActions.receiveTempAvatarURL(reader.result);
      this.setState({ cropperURL: reader.result });
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.resetFile();
    }
  },

  profilePic: function() {
    if (this.props.avatar) {
      return (
        <img
          src={this.props.avatar}
          className="profile-pic"
          />);
    } else {
      return (
        <div className='default-profile-pic'></div>
      );
    }
  },

  render: function() {
    return (
      <div
        className="profile-pic-wrapper"
        onDrop={this._drop}
        onDragEnter={this._stop}
        onDragOver={this._stop}
        >
        {this.profilePic()}

        <p className="profile-pic-edit" onClick={this._onClick} >
          Edit your <br />profile picture
        </p>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          onAfterOpen={this.onModalOpen}
        >
          <Cropper
            imageURL={this.state.cropperURL}
            crop={this._handleUpload}
            uploadImage={this._tempAvatarUpload}
            />
        </Modal>
      </div>
    );
  }

});

module.exports = ProfilePic;
