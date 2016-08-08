var React = require('react');
var Modal = require('react-modal');
var ModalStyle = require('../../styles/modalStyle');
var ProfileStore = require('../../stores/profile');
var CropperStore = require('../../stores/cropper');
var CropperUtil = require('../../utils/cropper');
var Cropper = require('./edit/cropper');

var ProfilePic = React.createClass({

  getInitialState: function() {
    return {
      modalOpen: false,
      modalImage: null
    };
  },

  componentDidMount: function() {
    this.cropperStoreToken = CropperStore.addListener(this._tempAvatarChange);
  },

  componentWillUnMount: function() {
    this.cropperStoreToken.remove();
  },

  _tempAvatarChange: function() {
    if (!this.state.modalOpen) { this.openModal(CropperStore.newAvatar()); }
  },

  openModal: function(image) {
    ModalStyle.content.opacity = 0;
    this.setState({ modalImage: image, modalOpen: true });
  },

  onModalOpen: function() {
    ModalStyle.content.opacity = 100;
  },

  closeModal: function() {
    this.setState({ modalImage: null, modalOpen: false });
    // CropperUtil.clearCropperStore();
  },

  _drop: function(e) {
    this._stop(e);
    this._tempAvatarUpload(e.dataTransfer.files);
  },

  _onClick: function() {
    this.openModal(this.props.avatar);
  },

  _stop: function(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  _handleUpload: function() {

  },

  _tempAvatarUpload: function(file) {
    var formData = new FormData();
    formData.append("photo[image]", file[0]);
    CropperUtil.createTempProfilePic(formData);
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
          <h2>The Modal</h2>
            <Cropper
              image={this.state.modalImage}
              width={270}
              height={270}
              upload={this._handleUpload}
              />
        </Modal>
      </div>
    );
  }

});

module.exports = ProfilePic;
