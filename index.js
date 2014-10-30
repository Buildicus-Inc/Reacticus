var _ = require('lodash');
var React = require('react');

var crop = require('./elements/crop');
var select = require('./elements/select');
var iconselect =  require('./elements/iconselect');
var fontselect = require('./elements/fontselect');
var checkbox = require('./elements/checkbox');
var colorpicker = require('./elements/colorpicker');
var deleteInput = require('./elements/delete');
var listField = require('./elements/listfield');
var slugInput = require('./elements/sluginput');
var upload = require('./elements/upload');
var buttons = require('./elements/buttons');
var ToggleButton = buttons.ToggleButton,
	SectionToggleButton = buttons.SectionToggleButton;

var i18nDOM = require('./elements/i18n');
var SubscriptionMixin = require('./elements/channels');
var FormMixin = require('./elements/form');

var ImplementedDOM = {
  ToggleButton: ToggleButton,
  SectionToggleButton: SectionToggleButton,
  select: select,
  iconselect: iconselect,
  slugInput: slugInput,
  deleteInput: deleteInput,
  fontselect: fontselect,
  checkbox: checkbox,
  colorpicker: colorpicker,
  listField: listField,
  upload: upload,
  crop: crop
};

var DOM = _.merge({}, React.DOM, i18nDOM, ImplementedDOM);

export default = {
  DOM: DOM,
  i18nDOM: DOM
};

export {
  DOM,
  i18n,
  FormMixin,
  SubscriptionMixin,
  gettext
};

export var i18nDOM = DOM;
export var ToggleButton = ImplementedDOM.ToggleButton;
export var SectionToggleButton = ImplementedDOM.SectionToggleButton;
export var select = ImplementedDOM.select;
export var iconselect = ImplementedDOM.iconselect;
export var slugInput = ImplementedDOM.slugInput;
export var deleteInput = ImplementedDOM.deleteInput;
export var fontselect = ImplementedDOM.fontselect;
export var checkbox = ImplementedDOM.checkbox;
export var colorpicker = ImplementedDOM.colorpicker;
export var listField = ImplementedDOM.listField;
export var upload = ImplementedDOM.upload;
export var crop = ImplementedDOM.crop;
