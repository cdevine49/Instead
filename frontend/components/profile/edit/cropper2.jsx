var React = require('react');
var ReactDOM = require('react-dom');
var CropperUtil = require('../../../utils/cropper');
var CropperStore = require('../../../stores/cropper');

var Cropper = React.createClass({

  getInitialState: function() {
    return {
      imageURL: CropperStore.URL(),
      jcrop: null
    };
  },

  componentDidMount: function() {
    if (CropperStore.URL()) {
      this.jCrop();
    }
    this.cropperStoreToken = CropperStore.addListener(this._onChange);
  },

  _onChange: function() {
    var url = CropperStore.URL();
    this.setState({ imageURL: url });
    if (this.state.jcrop) {
      $('.jcrop-holder img').attr('src', url);
    } else {
      this.jCrop();
    }
  },

  componentWillUnmount: function() {
    this.cropperStoreToken.remove();
    // CropperUtil.clearCropperStore();
  },

  // componentWillReceiveProps: function(nextProps) {
  //   if (this.props !== nextProps) {
  //     $('.jcrop-holder img').attr('src', nextProps.avatar);
  //   }
  // },

  jCrop: function() {
    var that = this;
    $('#cropbox').Jcrop({
      onChange: that.update_crop,
      onSelect: that.update_crop,
      setSelect: [0,0,270,270],
      aspectRatio: 1
    }, function() { that.setState({ jcrop: this }); });
  },

  update_crop: function(coords) {
    var rx = 200/coords.w;
    var ry = 200/coords.h;
    $('#preview').css({
      width: Math.round(rx * 270) + 'px',
      height: Math.round(ry * 270) + 'px',
      marginLeft: '-' + Math.round(rx * coords.x) + 'px',
      marginTop: '-' + Math.round(ry * coords.y) + 'px'
    });
    // var ratio = this.props.image.avatar_geometry(:original).width / this.props.image.avatar_geometry(:large).width;
    $("#crop_x").val(Math.round(coords.x));
    $("#crop_y").val(Math.round(coords.y));
    $("#crop_w").val(Math.round(coords.w));
    $("#crop_h").val(Math.round(coords.h));
  },

  uploadImage: function(e) {
    var file = e.currentTarget.files[0];
    this.props.uploadImage(file);
  },

  render: function() {
    var wrapperStyle = {
      width: this.props.width,
      height: this.props.height
    };

    return (
      <div>
        <header>
          <h3>
            <span>Edit Photo</span>
            <span>x</span>
          </h3>
          <p>Make sure you're looking your best...</p>
          <input type="file" accept="image/*" onChange={this.uploadImage} />
        </header>
        <div style={wrapperStyle}>
          {this.display()}
        </div>

        <div className='new-avatar-preview'>
          <img src={this.state.imageURL} id='preview'/>
        </div>

        <form onSubmit={this.props.upload} ref='cropForm'>
          <input
            type='number'
            id='crop_x'
            name='crop_x'
            defaultValue='0'
            >
          </input>
          <input
            type='number'
            id='crop_y'
            name='crop_y'
            defaultValue='0'
            >
          </input>
          <input
            type='number'
            id='crop_w'
            name='crop_w'
            defaultValue={this.props.width}
            >
          </input>
          <input
            type='number'
            id='crop_h'
            name='crop_h'
            defaultValue={this.props.height}
            >
          </input>

          <input
            type="submit"
            value="Crop" />
        </form>
      </div>
    );
  },

  display: function() {
    if (this.state.imageURL) {
      return (
        <img id='cropbox' className='profile-pic' src={this.state.imageURL}/>);
    } else {
      return (
        <div className='default-profile-pic'></div>
      );
    }
  },

});

module.exports = Cropper;
