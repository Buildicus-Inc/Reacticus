'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var Tabs = _React2['default'].createClass({
  displayName: 'Tabs',

  /* A button with a data-toggle that tied to props.section */
  propTypes: {
    sections: _React2['default'].PropTypes.object,
    labels: _React2['default'].PropTypes.object,
    collapseable: _React2['default'].PropTypes.bool,
    active: _React2['default'].PropTypes.string,
    defaultTab: _React2['default'].PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      collapseable: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      active: this.props.active || this.props.defaultTab || _import2['default'].first(_import2['default'].keys(this.props.sections)),
      collapsed: false
    };
  },
  onClick: function onClick(key, event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.props.collapseable && this.state.active === key) {
      this.setState({ collapsed: !this.state.collapsed });
    } else {
      this.setState({ active: key });
    }
  },
  isActive: function isActive(slug) {
    return this.state.active === slug && !this.state.collapsed ? '1' : '0';
  },
  renderTabButton: function renderTabButton(section) {
    var label = this.props.labels[section];
    var cName = 'vbtn vbtn-' + section;
    var active = this.isActive(section);
    var onClick = this.onClick.bind(this, section);
    return _React2['default'].createElement(
      'li',
      { className: cName, 'data-active': active, onClick: onClick, key: section },
      label
    );
  },
  renderSection: function renderSection(section, key) {
    var active = this.isActive(key);
    var cName = 'panel-' + key;
    if (section.props.children) cName = 'panel-' + section.props.children.props.sectionIcon;
    return _React2['default'].createElement(
      'section',
      { className: cName, 'data-active': active, key: key },
      section
    );
  },
  renderSections: function renderSections() {
    return _import2['default'].map(this.props.sections, this.renderSection);
  },
  renderNav: function renderNav() {
    return _import2['default'].map(_import2['default'].keys(this.props.sections), this.renderTabButton);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.sections !== this.props.sections && nextProps.sections && !nextProps.sections[this.state.active]) {
      var active = nextProps.active || nextProps.defaultTab || _import2['default'].first(_import2['default'].keys(nextProps.sections));
      this.setState({ active: active });
    }
  },
  render: function render() {
    var displayClasses = 'reacticus-tab-display';
    if (this.props.collapseable) {
      displayClasses += ' collapseable';
      if (this.state.collapsed) {
        displayClasses += ' collapsed';
      }
    }

    return _React2['default'].createElement(
      'div',
      { className: 'reacticus-tab' },
      _React2['default'].createElement(
        'ul',
        { className: 'reacticus-tab-nav', key: 'nav' },
        this.renderNav()
      ),
      _React2['default'].createElement(
        'div',
        { className: displayClasses, key: 'display' },
        this.renderSections()
      )
    );
  }
});
exports.Tabs = Tabs;