var React = require('react');
var I18n = require('./i18n').I18n;

var DeleteInput = React.createClass({
  getInitialState: function() {
    return {confirm: false}
  },
  toggleConfirmation: function(event) {
    this.setState({confirm: !this.state.confirm})
    if (this.props.onClick) this.props.onClick(event)
  },
  confirmed: function(event) {
    if (this.props.onConfirm) this.props.onConfirm(event)
  },
  render: function(){
    if(this.state.confirm) {
      return <div {...this.props} style={{padding: 2}}>
        <label><I18n>Are you sure?</I18n></label>
        <button style={{float: 'left'}} key="yes" type="button" className="m-right btn btn-danger btn-sm" onClick={this.confirmed}><I18n>Yes</I18n></button>
        <button key="no" type="button" className="btn btn-success btn-sm" onClick={this.toggleConfirmation}><I18n>No</I18n></button>
      </div>
    } else {
      return <div {...this.props}>
        <button key="delete" type="button" className="btn btn-danger btn-sm" onClick={this.toggleConfirmation}><I18n>Delete</I18n></button>
      </div>
    }
  }
});
