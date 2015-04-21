'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var SlugInput = _React2['default'].createClass({
  displayName: 'SlugInput',

  propTypes: {
    value: _React2['default'].PropTypes.string
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.value || this.props.defaultValue,
      hasChanged: false
    };
  },
  setValue: function setValue(value) {
    if (this.state.hasChanged) {
      return;
    }this.setState({
      value: this.slugify(value)
    });
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (_import2['default'].has(nextProps, 'value')) {
      this.setState({
        value: nextProps.value
      });
    }
  },
  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    //receiving new props, has the user already changed the value?
    if (nextProps.value !== undefined && !nextState.hasChanged) {
      nextState.value = this.slugify(nextProps.value);
    }
  },
  slugify: function slugify(text) {
    return text.replace(/[^-a-zA-Z0-9\s+]+/ig, '').replace(/\s+/gi, '-').toLowerCase();
  },
  update: function update(event) {
    this.setState({
      value: this.slugify(event.target.value),
      hasChanged: true
    });
    if (this.props.onChange) {
      this.props.onChange({
        component: this,
        value: this.slugify(event.target.value)
      });
    } else {
      event.preventDefault();
    }
  },
  getComputedProps: function getComputedProps(moreProps) {
    return _import2['default'].merge({
      type: 'text',
      value: this.state.value,
      onChange: this.update }, _import2['default'].omit(this.props, 'onChange', 'value', 'defaultValue'), moreProps);
  },
  render: function render() {
    return _React2['default'].createElement('input', this.getComputedProps());
  }
});
exports.SlugInput = SlugInput;