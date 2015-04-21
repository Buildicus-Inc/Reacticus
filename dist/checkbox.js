'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var CheckBox = _React2['default'].createClass({
  displayName: 'CheckBox',

  propTypes: {
    value: _React2['default'].PropTypes.bool
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.checked || this.props.defaultChecked || false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (_import2['default'].has(nextProps, 'value')) {
      this.setState({
        value: nextProps.value
      });
    } else if (_import2['default'].has(nextProps, 'checked')) {
      this.setState({
        value: nextProps.checked
      });
    }
  },
  handleClick: function handleClick(event) {
    this.setState({ value: !this.state.value });
    if (this.props.onChange) {
      //TODO mock checkbox event as closely as possible
      event.component = this;
      event.value = !this.state.value;
      this.props.onChange(event);
    } else {
      event.preventDefault();
    }
  },
  getComputedProps: function getComputedProps(moreProps) {
    return _import2['default'].merge({
      className: 'social-switch',
      'data-active': this.state.checked ? 1 : 0,
      type: 'checkbox',
      checked: this.state.checked,
      onClick: this.handleClick }, _import2['default'].omit(this.props, 'onChange', 'checked'), moreProps);
  },
  render: function render() {
    return _React2['default'].createElement('i', this.getComputedProps());
  }
});
exports.CheckBox = CheckBox;