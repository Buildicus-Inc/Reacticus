var _ = require('lodash');
var React = require('react');

var SlugInput = React.createClass({
  propTypes: {
    value: React.PropTypes.string
  },
	getInitialState: function(){
		return {
      value: this.props.value || this.props.defaultValue,
      hasChanged: false
    }
	},
  setValue: function(value) {
    if (this.state.hasChanged) return;
    this.setState({
      value: this.slugify(value)
    })
  },
  componentWillReceiveProps: function(nextProps) {
    if (_.has(nextProps, 'value')) {
      this.setState({
        value: nextProps.value
      });
    }
  },
  componentWillUpdate: function(nextProps, nextState) {
    //receiving new props, has the user already changed the value?
    if (nextProps.value !== undefined && !nextState.hasChanged) {
      nextState.value = this.slugify(nextProps.value);
    }
  },
	slugify: function(text){
	  return text.replace(/[^-a-zA-Z0-9\s+]+/ig, '').replace(/\s+/gi, "-").toLowerCase();
	},
	update: function(event){
	  this.setState({
      value: this.slugify(event.target.value),
      hasChanged: true
    })
    if (this.props.onChange) {
      this.props.onChange(event)
    } else {
      event.preventDefault()
    }
	},
  getComputedProps: function(moreProps) {
    return _.merge({
      type: "text",
      value: this.state.value,
      onChange: this.update,
    }, _.omit(this.props, 'onChange', 'value', 'defaultValue'), moreProps)
  },
  render: function(){
    return <input {...this.getComputedProps()}/>
  }
})
