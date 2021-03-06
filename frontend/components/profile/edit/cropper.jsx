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
    if (this.props.imageURL) {
      this.jCrop();
    }
  },

  componentWillReceiveProps: function(nextProps) {
    $('.jcrop-holder img').attr('src', nextProps.imageURL);
    var that = this;
    that.props.imageURL = nextProps.imageURL;
    that.jCrop();
  },

  jCrop: function() {
    var that = this;
    $('#cropbox').Jcrop({
      onChange: that.update_crop,
      onSelect: that.update_crop,
      setSelect: [0,0,270,270],
      aspectRatio: 1
    });
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
    $(".cropper-submit").prop('disabled', this.disable(ratio));
  },

  uploadImage: function(e) {
    var file = e.currentTarget.files[0];
    this.props.uploadImage(file);
  },

  handleCrop: function(e) {
    console.log("not disabled");
    // e.preventDefault();
    // var cropData = {};
    // var cropArray = $(this.refs.cropForm.elements).serializeArray();
    // cropArray.forEach(function(dim) {
    //   cropData[dim.name] = dim.value;
    // });
    // var data = $.extend({image: this.props.imageURL}, cropData);
    // this.props.crop(data);
  },

  render: function() {
    var wrapperStyle = {
      width: this.props.width,
      height: this.props.height
    };

    return (
      <div className='cropper'>
        <header className='cropper-header'>
          <div>
            <span className='cropper-title'>Edit Photo</span>
            <button className='cropper-close'>x</button>
          </div>
          <h3 className='cropper-message'>Make sure you're looking your best...</h3>
        </header>

        <div className='cropper-uploader'>
          <div className='flex-left'>
            <div className='cropper-instructions'>
              <h4>Adjust Photo</h4>
              <p>
                Drag the {this.props.cropSquareColor} rectangle to change position and size. &nbsp;
                <label htmlFor='file-upload' className='cropper-file-upload'>Change Photo.
                  <input
                    type="file"
                    id='file-upload'
                    accept="image/*"
                    onChange={this.uploadImage} />
                </label>
              </p>
            </div>

            <div className='cropper-container' style={wrapperStyle}>
              {this.display()}
            </div>

            <div className='cropper-panel'>
              <button
                className='cropper-sprites cropper-rotate-left'
                title='Rotate Left'
                ></button>
              <button
                className='cropper-sprites cropper-rotate-right'
                title='Rotate Right'
                ></button>
              <div className='cropper-sprites cropper-privacy'></div>
            </div>
          </div>

          <div className='flex-right'>
            <div className='cropper-instructions'>
              <h4>Preview</h4>
              <p>How you appear across Instead</p>
            </div>

            <div className='new-avatar-preview'>
              <img src={this.props.imageURL} id='preview'/>
            </div>
          </div>
        </div>

        <form onSubmit={this.handleCrop} ref='cropForm'>
          <input
            type='hidden'
            id='crop_x'
            name='crop_x'
            defaultValue='0'
            >
          </input>
          <input
            type='hidden'
            id='crop_y'
            name='crop_y'
            defaultValue='0'
            >
          </input>
          <input
            type='hidden'
            id='crop_w'
            name='crop_w'
            defaultValue={this.props.width}
            >
          </input>
          <input
            type='hidden'
            id='crop_h'
            name='crop_h'
            defaultValue={this.props.height}
            >
          </input>
          <input
            type='hidden'
            id='rotation'
            name='rotation'
            defaultValue={0}
            ></input>

          <div className='cropper-actions'>
            <input
              type="submit"
              value="Save"
              className='submit cropper-submit'
              />
            <button type="button" className='cancel cropper-cancel' onClick={this.props.close}>Cancel</button>
            <button type="button" className='delete cropper-delete'>Delete Photo</button>
          </div>

        </form>
      </div>
    );
  },

  getDefaultProps: function() {
    return {
      cropSquareColor: '',
      height: 270,
      width: 270
    };
  },

  display: function() {
    if (this.props.imageURL) {
      return (
        <img
          id='cropbox'
          className='cropper-image'
          src={this.props.imageURL}
          />);
    } else {
      return (
        <div className='cropper-default-pic cropper-image'></div>
      );
    }
  },

  disable: function(ratio) {
    var zeros = true,
        width = true,
        height = true;
    $.each(["#crop_x", "#crop_y", "#rotation"], function(index, id) {
      if ($(id).val() != 0) { _zeros = false; }
    });

    if ($("#crop_w").val()!= (this.props.width * ratio)) { width = false; }
    if ($("#crop_h").val() != (this.props.height * ratio)) { height = false; }

    return (zeros && width && height);
  }

});

module.exports = Cropper;
