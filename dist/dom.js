'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _Crop = require('./crop');

var _Select = require('./select');

var _IconSelect = require('./iconselect');

var _FontSelect = require('./fontselect');

var _CheckBox = require('./checkbox');

var _ColorPicker = require('./colorpicker');

var _DeleteInput = require('./delete');

var _ListField = require('./listfield');

var _SlugInput = require('./sluginput');

var _Upload = require('./upload');

var _ToggleButton$SectionToggleButton = require('./buttons');

var ImplementedDOM = {
  ToggleButton: _ToggleButton$SectionToggleButton.ToggleButton,
  SectionToggleButton: _ToggleButton$SectionToggleButton.SectionToggleButton,
  Select: _Select.Select,
  IconSelect: _IconSelect.IconSelect,
  SlugInput: _SlugInput.SlugInput,
  DeleteInput: _DeleteInput.DeleteInput,
  FontSelect: _FontSelect.FontSelect,
  CheckBox: _CheckBox.CheckBox,
  ColorPicker: _ColorPicker.ColorPicker,
  ListField: _ListField.ListField,
  Upload: _Upload.Upload,
  Crop: _Crop.Crop
};

exports.ImplementedDOM = ImplementedDOM;
var DOM = _import2['default'].merge({}, _React2['default'].DOM, ImplementedDOM);
exports.DOM = DOM;