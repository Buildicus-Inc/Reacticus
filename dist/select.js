'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _deepCloneComponent = require('./identities');

/*
 <reacticus.select defaultValue="foo" onChange={mycallback}>
   <option value="">Select a Value</option>
   <option value="foo">Fooz Ballz</option>
 </reacticus.select>
*/

var Select = _React2['default'].createClass({
  displayName: 'Select',

  /* A specially styled select */
  propTypes: {
    value: _React2['default'].PropTypes.node
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.value || this.props.defaultValue,
      displayOptions: false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (_import2['default'].has(nextProps, 'value')) {
      this.setState({
        value: nextProps.value
      });
    }
  },
  getComputedProps: function getComputedProps(moreProps) {
    var props = _import2['default'].merge({}, this.props, moreProps);
    if (props.className) {
      props.className += ' reacticus-select';
    } else {
      props.className = 'reacticus-select';
    }
    return props;
  },
  onSelect: function onSelect(value) {
    if (this.state.value !== value) {
      this.setState({
        value: value,
        displayOptions: false
      });
      if (this.props.onValue) {
        this.props.onValue(value);
      }
      if (this.props.onChange) {
        var changeEvent = {};
        changeEvent.component = this;
        changeEvent.value = value;
        changeEvent.preventDefault = function () {
          return;
        };
        changeEvent.stopPropagation = function () {
          return;
        };
        this.props.onChange(changeEvent);
      }
    }
  },
  onClick: function onClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ displayOptions: !this.state.displayOptions });
  },
  onBlur: function onBlur(event) {
    if (this.state.displayOptions) {
      this.setState({ displayOptions: false });
    }
  },
  getChildren: function getChildren() {
    return _import2['default'].filter(_import2['default'].flatten(this.props.children), function (x) {
      return x && x.props;
    });
  },
  getSelected: function getSelected() {
    var currentValue = this.state.value;
    return _deepCloneComponent.deepCloneComponent(_import2['default'].find(this.getChildren(), function (child, index) {
      var value = child.props.value,
          body = child.props.children;
      if (_import2['default'].isUndefined(value)) {
        value = body;
      }
      if (!value && !currentValue) return true;
      return value === currentValue;
    }));
  },
  getDisplayLabel: function getDisplayLabel() {
    var selected = this.getSelected();
    if (selected) {
      if (selected.props.style) {
        return _React2['default'].createElement(
          'p',
          { style: selected.props.style },
          selected.props.children
        );
      } else {
        return selected.props.children;
      }
    }
    return this.state.value || 'Select an option...';
  },
  componentDidMount: function componentDidMount() {
    window.addEventListener('click', this.onBlur);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('click', this.onBlur);
  },
  getOptions: function getOptions() {
    var currentValue = this.state.value,
        self = this;
    return _import2['default'].map(this.getChildren(), function (child, index) {
      var value = child.props.value,
          body = _deepCloneComponent.deepCloneComponent(child.props.children);
      if (_import2['default'].isUndefined(value)) {
        value = body;
      }
      var props = _import2['default'].extend({
        className: value === currentValue ? 'selected' : 'unselected',
        selected: value === currentValue,
        key: index,
        onClick: self.onSelect.bind(self, value)
      }, _import2['default'].omit(child.props, 'value', 'children'));
      return _React2['default'].createElement(
        'li',
        props,
        body
      );
    });
  },
  render: function render() {
    var baseClass = this.state.displayOptions ? 'options show' : 'options hide';
    var selectClass = 'selection ' + baseClass;
    return _React2['default'].createElement(
      'div',
      this.getComputedProps(),
      _React2['default'].createElement(
        'div',
        { className: 'current-value', key: 'display', onClick: this.onClick },
        this.getDisplayLabel()
      ),
      _React2['default'].createElement(
        'ul',
        { className: selectClass, key: 'options' },
        this.getOptions()
      )
    );
  }
});
exports.Select = Select;