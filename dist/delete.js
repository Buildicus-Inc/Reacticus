'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _I18n = require('./i18n');

var DeleteInput = _React2['default'].createClass({
  displayName: 'DeleteInput',

  getInitialState: function getInitialState() {
    return { confirm: false };
  },
  toggleConfirmation: function toggleConfirmation(event) {
    this.setState({ confirm: !this.state.confirm });
    if (this.props.onClick) this.props.onClick(event);
  },
  confirmed: function confirmed(event) {
    if (this.props.onConfirm) this.props.onConfirm(event);
  },
  render: function render() {
    if (this.state.confirm) {
      return _React2['default'].createElement(
        'div',
        _extends({}, this.props, { style: { padding: 2 } }),
        _React2['default'].createElement(
          'label',
          null,
          _React2['default'].createElement(
            _I18n.I18n,
            null,
            'Are you sure?'
          )
        ),
        _React2['default'].createElement(
          'button',
          { style: { float: 'left' }, key: 'yes', type: 'button', className: 'm-right btn btn-danger btn-sm', onClick: this.confirmed },
          _React2['default'].createElement(
            _I18n.I18n,
            null,
            'Yes'
          )
        ),
        _React2['default'].createElement(
          'button',
          { key: 'no', type: 'button', className: 'btn btn-success btn-sm', onClick: this.toggleConfirmation },
          _React2['default'].createElement(
            _I18n.I18n,
            null,
            'No'
          )
        )
      );
    } else {
      return _React2['default'].createElement(
        'div',
        this.props,
        _React2['default'].createElement(
          'button',
          { key: 'delete', type: 'button', className: 'btn btn-danger btn-sm', onClick: this.toggleConfirmation },
          _React2['default'].createElement(
            _I18n.I18n,
            null,
            'Delete'
          )
        )
      );
    }
  }
});
exports.DeleteInput = DeleteInput;