import _ from 'lodash';
import React from 'react';
import {FormMixin} from './form';
import {TransactionMixin} from './transactions';
import {DOM, ImplementedDOM} from './dom';
import {I18n, gettext, I18nReact} from './i18n';
import {Crop} from './crop';
import {Tabs} from './tabs';

export default {
  DOM: DOM,
  i18nDOM: DOM
};

export {
  I18nReact,
  DOM,
  I18n,
  FormMixin,
  gettext,
  TransactionMixin,
  Tabs,
  Crop
};

export var i18nDOM = DOM;
export var ToggleButton = ImplementedDOM.ToggleButton;
export var SectionToggleButton = ImplementedDOM.SectionToggleButton;
export var Select = ImplementedDOM.Select;
export var IconsSlect = ImplementedDOM.IconSelect;
export var SlugInput = ImplementedDOM.SlugInput;
export var DeleteInput = ImplementedDOM.DeleteInput;
export var FontSelect = ImplementedDOM.FontSelect;
export var CheckBox = ImplementedDOM.CheckBox;
export var ColorPicker = ImplementedDOM.ColorPicker;
export var ListField = ImplementedDOM.ListField;
export var Upload = ImplementedDOM.Upload;
