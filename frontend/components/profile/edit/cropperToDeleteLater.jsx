var React = require('react');
var ReactDOM = require('react-dom');
var CropperUtil = require('../../../utils/cropper');
var CropperStore = require('../../../stores/cropper');

var Cropper = React.createClass({

  getInitialState: function() {
    return {
      imageURL: null,
      imageFile: null,
      dragging: false,
      image: {},
      mouse: {
        x: null,
        y: null
      },
      preview: null
    };
  },

  componentDidMount: function() {
    // this.cropperStoreToken = CropperStore.addListener(this._onChange);
    if (this.props.image || CropperStore.newAvatar()) {
      var canvas = ReactDOM.findDOMNode(this.refs.canvas);
      var context = canvas.getContext('2d');
      this.jCrop();
      if (CropperStore.newAvatar()) {
        this.prepareImage(CropperStore.newAvatar().image);
      } else {
        this.prepareImage(this.props.image);
      }
    }
  },

  componentDidUpdate: function() {
    var context = ReactDOM.findDOMNode(this.refs.canvas).getContext("2d");
    context.clearRect(0, 0, this.props.width, this.props.height);
    this.addImageToCanvas(context, this.state.image);
  },

  componentWillUnmount: function() {
    // this.cropperStoreToken.remove();
    CropperUtil.clearCropperStore();
  },

  _onChange: function() {
    if (CropperStore.newAvatar()) {
      this.prepareImage(CropperStore.newAvatar().image);
    }
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

  prepareImage: function(image) {
    var img = new Image();
    // if (image !== this.props.image) {
    //   img.crossOrigin = 'anonymous';
    // }
    img.onload = function() {
      var scaledImage = this.fitImageToCanvas(img.width, img.height);
      scaledImage.resource = img;
      scaledImage.x = 0;
      scaledImage.y = 0;
      this.setState({ dragging: false, image: scaledImage, preview: this.toDataURL() });
    }.bind(this);
    img.src = image;
  },

  fitImageToCanvas: function(width, height) {
    var scaledHeight, scaledWidth;

    var canvasAspectRatio = this.props.height / this.props.width;
    var imageAspectRatio = height / width;

    if (canvasAspectRatio > imageAspectRatio) {
      scaledHeight = this.props.height;
      scaledWidth = (scaledHeight * width) / height;
    } else {
      scaledWidth = this.props.width;
      scaledHeight = (scaledWidth * height) / width;
    }

    return { width: scaledWidth, height: scaledHeight };
  },

  toDataURL: function() {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    canvas.width = this.props.width;
    canvas.height = this.props.height;
    this.addImageToCanvas(context, {
      resource: this.state.image.resource,
      x: this.state.image.x,
      y: this.state.image.y,
      height: this.state.image.height,
      width: this.state.image.width
    });

    return canvas.toDataURL();
  },

  addImageToCanvas: function(context, image) {
  if (!image.resource) return;
  context.save();
  context.globalCompositeOperation = "destination-over";
  var scaledWidth = this.state.image.width;
  var scaledHeight = this.state.image.height;

  // need to make sure we aren't going out of bounds here...
  var x = Math.min(image.x, 0);
  var y = Math.min(image.y, 0);
  y = scaledHeight + y >= this.props.height ? y : (y + (this.props.height - (scaledHeight + y)));
  x = scaledWidth + x >= this.props.width ? x : (x + (this.props.width - (scaledWidth + x)));

  context.drawImage( image.resource, x, y, image.width, image.height);
  context.restore();
  },

  handleFile: function(e) {
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      this.prepareImage(reader.result);
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.resetFile();
    }
  },

  uploadPhoto: function(e) {
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      var formData = new FormData();
      formData.append("photo[image]", file);
      CropperUtil.createTempProfilePic(formData);
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.resetFile();
    }
  },

  uploadProfilePic: function() {
    CropperUtil.uploadProfilePic(this.preview);
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
          <input type="file" accept="image/*" onChange={this.uploadPhoto} />
        </header>
        <div style={wrapperStyle}>
          {this.display()}
        </div>

        <div className='new-avatar-preview'>
          <img src={this.props.image} id='preview'/>
        </div>
        <button onClick={this.uploadProfilePic}>Crop</button>
      </div>
    );
  },

  display: function() {
    if (this.props.image || CropperStore.newAvatar()) {
      return (<canvas
        id='cropbox'
        ref='canvas'
        width={this.props.width}
        height={this.props.height}
        />);
    } else {
      return (
        <div className='default-profile-pic'></div>
      );
    }
  }

});

module.exports = Cropper;
