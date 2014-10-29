/** @jsx React.DOM */
import React from 'react';
import _ from 'lodash';

export var CheckBox = React.createClass({
  propTypes: {
    value: React.PropTypes.bool
  },
	getInitialState: function(){
    return {
      value: this.props.checked || this.props.defaultChecked || false
    }
	},
  componentWillReceiveProps: function(nextProps) {
    if (_.has(nextProps, 'value')) {
      this.setState({
        value: nextProps.value
      });
    } else if (_.has(nextProps, 'checked')) {
      this.setState({
        value: nextProps.checked
      });
    }
  },
	handleClick: function(event){
		this.setState({value: !this.state.value})
    if (this.props.onChange) {
      //TODO mock checkbox event as closely as possible
      event.component = this;
      event.value = !this.state.value;
      this.props.onChange(event)
    } else {
      event.preventDefault()
    }
	},
  getComputedProps: function(moreProps) {
    return _.merge({
      className: "social-switch",
      'data-active': this.state.checked ? 1 : 0,
      type: "checkbox",
      checked: this.state.checked,
      onClick: this.handleClick,
    }, _.omit(this.props, 'onChange', 'checked'), moreProps)
  },
	render: function(){
    return <i {...this.getComputedProps()}/>
	}
});
