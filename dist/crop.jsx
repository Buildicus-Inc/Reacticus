'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var Crop = _React2['default'].createClass({
  displayName: 'Crop',

  getInitialState: function getInitialState() {
    return { image: this.props.image, scaled: false } || {};
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.image != this.props.image) {
      var image = nextProps.image.url;
      var name = nextProps.image.name;
      this.setState({ image: image, name: name, scaled: false });
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this.state.scaled || !this.state.image) {
      return;
    }console.log('new image selected to crop');
    var image = new Image();
    image.src = this.state.image;
    image.crossOrigin = 'anonymous';
    var self = this;
    image.onload = function () {
      var canvas = document.createElement('canvas');
      var ratio = window.devicePixelRatio || 1;
      var width = 220;
      var effectiveWidth = image.width / ratio;
      if (effectiveWidth < width) width = effectiveWidth;
      self.setState({ width: width });
      var height = image.height * (width / image.width);
      if (window.devicePixelRatio) {
        canvas.height = height * ratio;
        canvas.width = width * ratio;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
      } else {
        canvas.height = height;
        canvas.width = width;
      }
      var ctx = canvas.getContext('2d');
      if (window.devicePixelRatio) ctx.scale(ratio, ratio);
      ctx.drawImage(image, 0, 0, width, height);
      var scaled = canvas.toDataURL();
      self.setState({ scaled: scaled, height: height, width: width });

      $(self.refs.crop.getDOMNode()).Jcrop({
        bgColor: 'none',
        bgOpacity: 0.4,
        aspectRatio: 1,
        setSelect: [0, 0, 100, 100],
        onSelect: self.cropSelectedArea,
        onChange: self.cropSelectedArea
      });
    };
  },
  cropSelectedArea: function cropSelectedArea(selection) {
    if (!this.state.scaled) {
      return;
    }var canvas = document.createElement('canvas');
    canvas.height = this.state.height;
    var ctx = canvas.getContext('2d');
    var image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = this.state.scaled;
    var self = this;
    image.onload = function () {
      var ratio = 1;
      if (window.devicePixelRatio) ratio = window.devicePixelRatio;
      ctx.drawImage(image, selection.x * ratio, selection.y * ratio, selection.w * ratio, selection.h * ratio, 0, 0, selection.w * ratio, selection.h * ratio);
      self.setState({ cropped: canvas.toDataURL() });
    };
  },
  b64toBlob: function b64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  },
  crop: function crop() {
    var b64 = this.state.cropped;
    b64 = b64.substring(b64.indexOf(',') + 1);
    var blob = this.b64toBlob(b64, 'image/png');
    this.props.onCrop({ blob: blob, name: this.state.name });
    this.setState({ scaled: false, image: false });
  },
  closeCrop: function closeCrop() {
    this.setState({ scaled: false, image: false });
  },
  render: function render() {
    var image = null;
    if (this.state.scaled) image = _React2['default'].createElement(
      'div',
      null,
      _React2['default'].createElement('img', { ref: 'crop', crossOrigin: 'anonymous', width: this.state.width, height: this.state.height, src: this.state.scaled }),
      _React2['default'].createElement(
        'button',
        { className: 'btn btn-success', onClick: this.crop },
        'Crop'
      ),
      _React2['default'].createElement(
        'button',
        { className: 'btn btn-danger', onClick: this.closeCrop },
        'Close'
      )
    );
    return _React2['default'].createElement(
      'div',
      this.props,
      image
    );
  }
});
exports.Crop = Crop;