'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

//value based helpers

exports.fillInState = fillInState;
exports.formUpdate = formUpdate;

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

function fillInState(state) {
  //replaces undefined with empty string
  return _import2['default'].transform(state, function (result, val, key) {
    if (val === undefined) val = '';
    result[key] = val;
  });
}

;

function formUpdate(prop, val) {
  var value = _import2['default'].clone(this._pendingState ? this._pendingState.value : this.state.value);

  //sent dictionary of values
  if (_import2['default'].size(arguments) == 1) {
    value = _import2['default'].extend(value, prop)
    //single update
    ;
  } else {
    value[prop] = val;
  }

  this.setState({ value: value });
  if (this.props.onValue) {
    this.props.onValue(value);
  }
  if (this.props.onChange) {
    this.props.onChange({
      component: this,
      type: 'input',
      value: value
    });
  }
}

;

var FormMixin = {
  propTypes: {
    value: _React2['default'].PropTypes.object
  },
  computeValueFromProps: function computeValueFromProps(props, defaultValue) {
    return defaultValue || (props ? props.value : {});
  },
  getInitialState: function getInitialState() {
    return {
      value: fillInState(this.computeValueFromProps(this.props, this.props.defaultValue))
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      value: fillInState(this.computeValueFromProps(nextProps))
    });
  },
  onChange: function onChange(event) {
    var val, prop;

    if (event.component) {
      val = event.value;
      prop = event.component.props.name;
    } else {
      val = event.target.value;
      prop = event.target.name;
      if (event.target.type == 'checkbox') {
        if (val == 'on') {
          val = event.target.checked;
        } else if (val) {
          val = event.target.checked ? val : null;
        } else {
          val = event.target.checked;
        }
      }
    }
    this.update(prop, val);
  },
  update: formUpdate
};
exports.FormMixin = FormMixin;