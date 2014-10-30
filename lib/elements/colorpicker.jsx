var React = require('react');

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
      preferredFormat: "hex"
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if (_.has(nextProps, 'value')) {
      this.state.value = nextProps.value
      $(this.getDOMNode()).spectrum("set", nextProps.value || "");
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextProps.value !== undefined && nextProps.value != nextState.value) {
       nextState.value = nextProps.value
    }
    if (this.state.value != nextState.value) {
      $(this.getDOMNode()).spectrum("set", nextState.value);
    }
    this.state = nextState;
    this.props = nextProps;
    return false;
  },
  componentDidMount: function() {
    var self = this;
     $(this.getDOMNode()).spectrum({
      clickoutFiresChange: true,
      preferredFormat: this.props.preferredFormat,
      showButtons: this.props.showButtons,
      showInput: true,
      showAlpha: this.props.showAlpha,
      change: function(color) {
        var value;
        if (self.props.showAlpha) {
          value = color.toString()
        } else {
          value = color.toHexString();
        }
        if (value == self.state.value) return;
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
    return <input {...this.props} type="color"/>;
  }
});
