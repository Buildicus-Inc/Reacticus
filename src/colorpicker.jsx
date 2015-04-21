import React from 'react';

export var ColorPicker = React.createClass({
  propTypes: {
    value: React.PropTypes.string
  },
  getInitialState: function(){
    return {value: this.props.value || this.props.defaultValue}
  },
  getDefaultProps: function() {
    return {
      showAlpha: false,
      showButtons: false,
      preferredFormat: "hex",
      allowEmpty: false
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if (_.has(nextProps, 'value')) {
      this.setState({value: nextProps.value || ""});
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    if (this.state.value !== nextState.value) {
      $(this.getDOMNode()).spectrum("set", nextState.value);
    }
    return false;
  },
  componentDidMount: function() {
    var self = this;
     $(this.getDOMNode()).spectrum({
      clickoutFiresChange: true,
      preferredFormat: this.props.showAlpha ? "rgb" : this.props.preferredFormat, //because of spectrum bug
      showButtons: this.props.showButtons,
      allowEmpty: this.props.allowEmpty,
      showInput: true,
      showAlpha: this.props.showAlpha,
      change: function(color) {
        var value = null;
        if(color){
          if (self.props.showAlpha) {
            value = color.toString()
          } else {
            value = color.toHexString();
          }
        }
        if (value === self.state.value) return;
        if (self.props.onChange) {
          var event = {
            type: 'input',
            component: self,
            value: value
          }
          self.props.onChange(event)
        }
        if (self.props.onValue) {
          self.props.onValue(value)
        }
      },
      color: self.state.value
    });
  },
  componentWillUnmount: function() {
    $(this.getDOMNode()).spectrum("destroy");
  },
  render: function() {
    return <input {...this.props} type="text"/>;
  }
});
