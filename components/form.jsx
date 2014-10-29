import _ from 'lodash';
import React from 'react';

//value based helpers

export function fillInState(state) {
  //replaces undefined with empty string
  return _.transform(state, function(result, val, key) {
    if (val === undefined) val = "";
    result[key] = val
  });
};

export function formUpdate(prop, val) {
  var value = _.clone(this._pendingState ? this._pendingState.value : this.state.value);

  //sent dictionary of values
  if (_.size(arguments) == 1) {
    value = _.extend(value, prop)
  //single update
  } else {
    value[prop] = val
  }

  this.setState({value: value});
  if (this.props.onValue) {
    this.props.onValue(value)
  }
  if (this.props.onChange) {
    this.props.onChange({
      component: this,
      type: 'input',
      value: value
    });
  }
};

export var FormMixin = {
  propTypes: {
    value: React.PropTypes.object
  },
  computeValueFromProps: function(props, defaultValue) {
    return defaultValue || (props ? props.value : {})
  },
  getInitialState: function() {
    return {
      value: fillInState(this.computeValueFromProps(this.props, this.props.defaultValue))
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: fillInState(this.computeValueFromProps(nextProps))
    });
  },
  onChange: function(event) {
    var val, prop;

    if (event.component) {
      val = event.value;
      prop = event.component.props.name;
    } else {
      val = event.target.value;
      prop = event.target.name;
      if (event.target.type == "checkbox") {
        if (val == "on") {
          val = event.target.checked;
        } else if (val) {
          val = event.target.checked ? val : null;
        } else {
          val = event.target.checked;
        }
      }
    }
    this.update(prop, val)
  },
  update: formUpdate
};
