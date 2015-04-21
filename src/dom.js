import _ from 'lodash';
import React from 'react';

import {Crop} from './crop';
import {Select} from './select';
import {IconSelect} from './iconselect';
import {FontSelect} from './fontselect';
import {CheckBox} from './checkbox';
import {ColorPicker} from './colorpicker';
import {DeleteInput} from './delete';
import {ListField} from './listfield';
import {SlugInput} from './sluginput';
import {Upload} from './upload';
import {ToggleButton, SectionToggleButton} from './buttons';

export var ImplementedDOM = {
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

export var DOM = _.merge({}, React.DOM, ImplementedDOM);
