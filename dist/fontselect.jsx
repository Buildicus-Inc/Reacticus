'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _Select = require('./select');

var FontSelect = _React2['default'].createClass({
  displayName: 'FontSelect',

  contextTypes: {
    site: _React2['default'].PropTypes.object
  },
  getInitialState: function getInitialState() {
    return { fonts: this.props.fonts };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.fonts) {
      this.setState({ fonts: nextProps.fonts });
    }
  },
  getDefaultProps: function getDefaultProps() {
    return {
      className: 'fontSelect', //TODO reacticus-fontselect
      fonts: ['Wire One', 'Courier New', 'Droid Sans Mono', 'Ubuntu Mono', 'Arial', 'Droid Sans', 'Fjalla One', 'Lato', 'Open Sans', 'Oswald', 'Quicksand', 'Source Sans Pro', 'Ubuntu', 'Verdana', 'Droid Serif', 'Georgia', 'Rokkitt', 'Times New Roman', 'Oregano', 'Nova Flat', 'Alex Brush']
    };
  },
  getOptions: function getOptions() {
    return _import2['default'].map(this.state.fonts, function (font, index) {
      return _React2['default'].createElement(
        'option',
        { key: index, value: font, style: { fontFamily: font } },
        font
      );
    });
  },
  render: function render() {
    return _React2['default'].createElement(
      _Select.Select,
      this.props,
      this.getOptions()
    );
  }
});
exports.FontSelect = FontSelect;