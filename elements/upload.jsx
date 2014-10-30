var I18n = require('./i18n').I18n;
var React = require('react');
//TODO cleanup prop interface
export var Upload = React.createClass({
  static : {
    messages: ['Click here or drop some images', 'Uploading...', 'Successfully Uploaded', 'Click or drag to upload again', 'Drop it now!'],
    colorStatus: ['white', 'yellow', 'green', 'white', '#00FF00']
  },
  getInitialState: function(){
    return {status: 0}
  },
  progress: function(e){
    this.setState({status: 1, bytesUploaded: e.loaded, bytesTotal: e.total})
  },
  complete: function(){
    this.setState({status: 2, bytesUploaded: null, bytesTotal: null})
    _.delay(this.reset, 2000);
  },
  reset: function(){
    //TODO check if we are unmounted
    try {
      this.setState({status: 3})
    } catch(e) {
      //pass
    }
  },
  update: function(event) {
    var self = this;
    var files
    if(event.target.files) files = event.target.files
    else if(event.dataTransfer.files) files = event.dataTransfer.files
    else return
    this.props.onUpload(files,function(data){
      self.props.onUploadedFiles(data)
    },
    this.progress,
    this.complete)
  },
  openSelector: function(){
      function click(el) {
        var evt = document.createEvent('Event');
        evt.initEvent('click', true, true);
        el.dispatchEvent(evt);
      }

      function MDNclick(el) {
        //coppied from MDN docs
        var event = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
        el.dispatchEvent(event)
      }

      //WAT or PRETTY?
      (MouseEvent && MDNclick || click) (this.refs.file.getDOMNode());
  },
  handleDragOver: function(event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    this.setState({status: 4})
  },
  handleDragLeave: function(event){
    this.setState({status: 0})
  },
  handleDrop: function(event) {
    event.stopPropagation();
    event.preventDefault();
    this.update(event)
  },
  renderProgressBar: function() {
    var percentage = parseInt(this.state.bytesUploaded * 100 / this.state.bytesTotal);
    return <progress key="progressBar" className="progress-bar" max="100" value={percentage}>
      <strong className="progress-status">Progress: {Math.round(percentage)}% done</strong>
    </progress>
  },
  render: function(){
    var fileStyle = {
      position: 'absolute',
      top: -999,
      left: -999
    };
    var dropStyle = {
      'border-color': this.static.colorStatus[this.state.status]
    };
    return <div {...this.props} className="reacticus-upload">
      <input style={fileStyle} ref="file" type="file" onChange={this.update}/>
      <div style={dropStyle} className="dropzone" onClick={this.openSelector} onDragLeave={this.handleDragLeave}
           onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
        <I18n>{this.static.messages[this.state.status]}</I18n>
        {this.state.bytesTotal ? this.renderProgressBar() : null}
      </div>
    </div>
  }

})
