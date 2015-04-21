'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _Kefir = require('kefir');

var _Kefir2 = _interopRequireWildcard(_Kefir);

var _BinderMixin = require('refluxxor');

var SectionToggleEvent = _Kefir2['default'].emitter();
exports.SectionToggleEvent = SectionToggleEvent;
//SectionToggleEvent.emit({section: foo, activeType: bar})

var ToggleMixin = {
  getInitialState: function getInitialState() {
    return { active: this.props['default'] || this.props.active || false };
  },
  getComputedProps: function getComputedProps(moreProps) {
    return _import2['default'].merge({ 'data-active': this.state.active ? 1 : 0 }, this.props, moreProps);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.active !== undefined) {
      this.setState({ active: nextProps.active });
    }
  }
};

exports.ToggleMixin = ToggleMixin;
var ToggleButton = _React2['default'].createClass({
  displayName: 'ToggleButton',

  /* A button with a data-toggle that toggles from 1 to 0 everytime it is clicked */
  mixins: [ToggleMixin],
  onClick: function onClick(event) {
    this.setState({ active: !this.state.active });
    if (this.props.onClick) {
      return this.props.onClick(event);
    }
  },
  render: function render() {
    return _React2['default'].createElement(
      'button',
      this.getComputedProps({ onClick: this.onClick, style: { display: 'inline' } }),
      this.props.children
    );
  }
});

exports.ToggleButton = ToggleButton;
var SectionToggleButton = _React2['default'].createClass({
  displayName: 'SectionToggleButton',

  /* A button with a data-toggle that tied to props.section */
  mixins: [ToggleMixin, _BinderMixin.BinderMixin],
  propTypes: {
    section: _React2['default'].PropTypes.string.isRequired
  },
  getDefaultProps: function getDefaultProps() {
    //reactjs broke this?
    return { id: _import2['default'].uniqueId() };
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    this.bindTo(SectionToggleEvent.filter(function (x) {
      return x.section === _this.props.sections;
    }), function (data) {
      _this.setState({ active: data.activeType === _this.props.id });
    });
  },
  onClick: function onClick(event) {
    if (this.state.active) {
      event.preventDefault();
      return;
    }
    SectionToggleEvent.emit({
      section: this.props.section,
      activeType: this.props.id });
    if (this.props.onClick) {
      return this.props.onClick(event);
    }
  },
  render: function render() {
    return _React2['default'].createElement(
      'div',
      this.getComputedProps({ onClick: this.onClick }),
      this.props.children
    );
  }
});
exports.SectionToggleButton = SectionToggleButton;