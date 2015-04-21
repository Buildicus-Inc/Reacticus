'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _I18n = require('./i18n');

//TODO cleanup prop interface
var Upload = _React2['default'].createClass({
  displayName: 'Upload',

  'static': {
    messages: ['Click here or drop some images', 'Uploading...', 'Successfully Uploaded', 'Click or drag to upload again', 'Drop it now!'],
    colorStatus: ['white', 'yellow', 'green', 'white', '#00FF00']
  },
  getInitialState: function getInitialState() {
    return { status: 0 };
  },
  progress: function progress(e) {
    this.setState({ status: 1, bytesUploaded: e.loaded, bytesTotal: e.total });
  },
  complete: function complete() {
    this.setState({ status: 2, bytesUploaded: null, bytesTotal: null });
    _.delay(this.reset, 2000);
  },
  reset: function reset() {
    //TODO check if we are unmounted
    try {
      this.setState({ status: 3 });
    } catch (e) {}
  },
  update: function update(event) {
    var self = this;
    var files;
    if (event.target.files) files = event.target.files;else if (event.dataTransfer.files) files = event.dataTransfer.files;else {
      return;
    }this.props.onUpload(files, function (data) {
      self.props.onUploadedFiles(data);
    }, this.progress, this.complete);
  },
  openSelector: function openSelector() {
    function click(el) {
      var evt = document.createEvent('Event');
      evt.initEvent('click', true, true);
      el.dispatchEvent(evt);
    }

    function MDNclick(el) {
      //coppied from MDN docs
      var event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(event);
    }

    //WAT or PRETTY?
    (MouseEvent && MDNclick || click)(this.refs.file.getDOMNode());
  },
  handleDragOver: function handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    this.setState({ status: 4 });
  },
  handleDragLeave: function handleDragLeave(event) {
    this.setState({ status: 0 });
  },
  handleDrop: function handleDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    this.update(event);
  },
  renderProgressBar: function renderProgressBar() {
    var percentage = parseInt(this.state.bytesUploaded * 100 / this.state.bytesTotal);
    return _React2['default'].createElement(
      'progress',
      { key: 'progressBar', className: 'progress-bar', max: '100', value: percentage },
      _React2['default'].createElement(
        'strong',
        { className: 'progress-status' },
        'Progress: ',
        Math.round(percentage),
        '% done'
      )
    );
  },
  render: function render() {
    var fileStyle = {
      position: 'absolute',
      top: -999,
      left: -999
    };
    var dropStyle = {
      'border-color': this['static'].colorStatus[this.state.status]
    };
    return _React2['default'].createElement(
      'div',
      _extends({}, this.props, { className: 'reacticus-upload' }),
      _React2['default'].createElement('input', { style: fileStyle, ref: 'file', type: 'file', onChange: this.update }),
      _React2['default'].createElement(
        'div',
        { style: dropStyle, className: 'dropzone', onClick: this.openSelector, onDragLeave: this.handleDragLeave,
          onDragOver: this.handleDragOver, onDrop: this.handleDrop },
        _React2['default'].createElement(
          _I18n.I18n,
          null,
          this['static'].messages[this.state.status]
        ),
        this.state.bytesTotal ? this.renderProgressBar() : null
      )
    );
  }

});
exports.Upload = Upload;

//pass