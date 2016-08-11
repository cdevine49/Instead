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
  },

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
    // replace 200 with a preview width && / || height prop
    var rx = 200/coords.w;
    var ry = 200/coords.h;
    $('#preview').css({
      width: Math.round(rx * this.props.width) + 'px',
      height: Math.round(ry * this.props.height) + 'px',
      marginLeft: '-' + Math.round(rx * coords.x) + 'px',
      marginTop: '-' + Math.round(ry * coords.y) + 'px'
    });
    var ratio = $('#cropbox')[0].naturalWidth / this.props.width;
    $("#crop_x").val(Math.round(coords.x * ratio));
    $("#crop_y").val(Math.round(coords.y * ratio));
    $("#crop_w").val(Math.round(coords.w * ratio));
    $("#crop_h").val(Math.round(coords.h * ratio));
  },

  uploadImage: function(e) {
    var file = e.currentTarget.files[0];
    this.props.uploadImage(file);
  },

  handleCrop: function(e) {
    e.preventDefault();
    var cropData = {};
    var cropArray = $(this.refs.cropForm.elements).serializeArray();
    cropArray.forEach(function(dim) {
      cropData[dim.name] = dim.value;
    });
    this.props.crop(this.state.imageURL, cropData);
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

        <form onSubmit={this.handleCrop} ref='cropForm'>
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
