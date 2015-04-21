'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var ColorPicker = _React2['default'].createClass({
  displayName: 'ColorPicker',

  propTypes: {
    value: _React2['default'].PropTypes.string
  },
  getInitialState: function getInitialState() {
    return { value: this.props.value || this.props.defaultValue };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      showAlpha: false,
      showButtons: false,
      preferredFormat: 'hex',
      allowEmpty: false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (_.has(nextProps, 'value')) {
      this.setState({ value: nextProps.value || '' });
    }
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (this.state.value !== nextState.value) {
      $(this.getDOMNode()).spectrum('set', nextState.value);
    }
    return false;
  },
  componentDidMount: function componentDidMount() {
    var self = this;
    $(this.getDOMNode()).spectrum({
      clickoutFiresChange: true,
      preferredFormat: this.props.showAlpha ? 'rgb' : this.props.preferredFormat, //because of spectrum bug
      showButtons: this.props.showButtons,
      allowEmpty: this.props.allowEmpty,
      showInput: true,
      showAlpha: this.props.showAlpha,
      change: function change(color) {
        var value = null;
        if (color) {
          if (self.props.showAlpha) {
            value = color.toString();
          } else {
            value = color.toHexString();
          }
        }
        if (value === self.state.value) {
          return;
        }if (self.props.onChange) {
          var event = {
            type: 'input',
            component: self,
            value: value
          };
          self.props.onChange(event);
        }
        if (self.props.onValue) {
          self.props.onValue(value);
        }
      },
      color: self.state.value
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    $(this.getDOMNode()).spectrum('destroy');
  },
  render: function render() {
    return _React2['default'].createElement('input', _extends({}, this.props, { type: 'text' }));
  }
});
exports.ColorPicker = ColorPicker;