/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');
var postal = require('postal');
var deepCloneComponent = require('./identities').deepCloneComponent;

/*
 <reacticus.select defaultValue="foo" onChange={mycallback}>
   <option value="">Select a Value</option>
   <option value="foo">Fooz Ballz</option>
 </reacticus.select>
*/

export var Select = React.createClass({
  /* A specially styled select */
  propTypes: {
    value: React.PropTypes.node
  },
  getInitialState: function() {
    return {
      value: this.props.value || this.props.defaultValue,
      displayOptions: false
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if (_.has(nextProps, 'value')) {
      this.setState({
        value: nextProps.value
      });
    }
  },
  getComputedProps: function(moreProps) {
    var props = _.merge({}, this.props, moreProps)
    if (props.className) {
      props.className += " reacticus-select";
    } else {
      props.className = "reacticus-select";
    }
    return props;
  },
  onSelect: function(value) {
    if (this.state.value !== value) {
      this.setState({
        value: value,
        displayOptions: false
      })
      if (this.props.onValue) {
        this.props.onValue(value);
      }
      if (this.props.onChange) {
        var changeEvent = {}
        changeEvent.component = this;
        changeEvent.value = value;
        changeEvent.preventDefault = function() {
          return;
        }
        changeEvent.stopPropagation = function() {
          return;
        }
        this.props.onChange(changeEvent)
      }
    }
  },
  onClick: function(event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState({displayOptions: !this.state.displayOptions})
  },
  onBlur: function(event) {
    if (this.state.displayOptions) {
      this.setState({displayOptions: false})
    }
  },
  getSelected: function() {
    var currentValue = this.state.value;
    return deepCloneComponent(_.find(_.flatten(this.props.children), function(child, index) {
      if (!child) return
      var value = child.props.value,
          body = child.props.children;
      if (!value && !currentValue) return true;
      if (value === undefined) {
        value = body
      }
      return value === currentValue
    }));
  },
  getDisplayLabel: function() {
    var selected = this.getSelected()
    if (selected) {
      if(selected.props.style) return <p style={selected.props.style}>{selected.props.children}</p>
      else return selected.props.children
    }
    return this.state.value || "Select an option..."
  },
  componentDidMount: function() {
    window.addEventListener("click", this.onBlur)
  },
  componentWillUnmount: function() {
    window.removeEventListener("click", this.onBlur)
  },
  getOptions: function() {
    var currentValue = this.state.value,
        self = this;
    return _.map(_.flatten(this.props.children), function(child, index) {
      if (!child) return
      var value = child.props.value,
          body = deepCloneComponent(child.props.children);
      if (value === undefined) {
        value = body
      }
      var props = _.extend({
        className: (value === currentValue) ? "selected" : "unselected",
        selected: (value === currentValue),
        key: index,
        onClick: self.onSelect.bind(self, value)
      }, _.omit(child.props, 'value', 'children'))
      return <li {...props}>{body}</li>;
    });
  },
  render: function() {
    var baseClass = this.state.displayOptions ? "options show" : "options hide"
    var selectClass = "selection " + baseClass;
    return <div {...this.getComputedProps()}>
      <div className="current-value" key="display" onClick={this.onClick}>{this.getDisplayLabel()}</div>
      <ul className={selectClass} key="options">{this.getOptions()}</ul>
    </div>
  }
});