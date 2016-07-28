var React = require('react');
var ReactDOM = require('react-dom');

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
    var canvas = ReactDOM.findDOMNode(this.refs.canvas);
    var context = canvas.getContext('2d');
    this.prepareImage(this.props.image);
  },

  componentDidUpdate: function() {
    var context = ReactDOM.findDOMNode(this.refs.canvas).getContext("2d");
    context.clearRect(0, 0, this.props.width, this.props.height);
    this.addImageToCanvas(context, this.state.image);
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

  render: function() {
    return (
      <div>
        <header>
          <h3>
            <span>Edit Photo</span>
            <span>x</span>
            </h3>
          <p>Make sure you're looking your best...</p>
        </header>
        <div>
          <canvas
            ref='canvas'
            width={this.props.width}
            height={this.props.height}
            />
        </div>
        <div>
        </div>
      </div>
    );
  }
  // <input type="file" accept="image/*" onChange={this.handleFile} />

});

module.exports = Cropper;
