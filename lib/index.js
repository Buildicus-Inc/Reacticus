var _ = require('lodash');
var React = require('react');

var Crop = require('./elements/crop');
var Select = require('./elements/select');
var IconSelect =  require('./elements/iconselect');
var FontSelect = require('./elements/fontselect');
var CheckBox = require('./elements/checkbox');
var ColorPicker = require('./elements/colorpicker');
var DeleteInput = require('./elements/delete');
var ListField = require('./elements/listfield');
var SlugInput = require('./elements/sluginput');
var Upload = require('./elements/upload');
var buttons = require('./elements/buttons');
var ToggleButton = buttons.ToggleButton,
	SectionToggleButton = buttons.SectionToggleButton;

var i18nDOM = require('./elements/i18n');
var SubscriptionMixin = require('./elements/channels');
var FormMixin = require('./elements/form');

var ImplementedDOM = {
  ToggleButton: ToggleButton,
  SectionToggleButton: SectionToggleButton,
  Select: Select,
  IconSelect: IconSelect,
  SlugInput: SlugInput,
  DeleteInput: DeleteInput,
  FontSelect: FontSelect,
  CheckBox: CheckBox,
  ColorPicker: ColorPicker,
  ListField: ListField,
  Upload: Upload,
  Crop: Crop
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
export var Select = ImplementedDOM.Select;
export var IconSelect = ImplementedDOM.IconSelect;
export var SlugInput = ImplementedDOM.SlugInput;
export var DeleteInput = ImplementedDOM.DeleteInput;
export var FontSelect = ImplementedDOM.FontSelect;
export var CheckBox = ImplementedDOM.CheckBox;
export var ColorPicker = ImplementedDOM.ColorPicker;
export var ListField = ImplementedDOM.ListField;
export var Upload = ImplementedDOM.Upload;
export var Crop = ImplementedDOM.Crop;
