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


var i18nDOM = DOM;
var ToggleButton = ImplementedDOM.ToggleButton;
var SectionToggleButton = ImplementedDOM.SectionToggleButton;
var Select = ImplementedDOM.Select;
var IconSelect = ImplementedDOM.IconSelect;
var SlugInput = ImplementedDOM.SlugInput;
var DeleteInput = ImplementedDOM.DeleteInput;
var FontSelect = ImplementedDOM.FontSelect;
var CheckBox = ImplementedDOM.CheckBox;
var ColorPicker = ImplementedDOM.ColorPicker;
var ListField = ImplementedDOM.ListField;
var Upload = ImplementedDOM.Upload;
var Crop = ImplementedDOM.Crop;
