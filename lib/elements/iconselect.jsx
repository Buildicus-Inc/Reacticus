/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');
var postal = require('postal');
/*
 <reacticus.select defaultValue="foo" onChange={mycallback}>
   <option value="">Select a Value</option>
   <option value="foo">Fooz Ballz</option>
 </reacticus.select>
*/
var icons = {
  asterisk: 'asterisk',
  plus: 'plus',
  euro: 'euro',
  minus: 'minus',
  cloud: 'cloud',
  envelope: 'envelope',
  pencil: 'pencil',
  glass: 'glass',
  music: 'music',
  search: 'search',
  heart: 'heart',
  star: 'star',
  stare: 'star-empty',
  user: 'user',
  film: 'film',
  thl: 'th-large',
  th: 'th',
  thli: 'th-list',
  ok: 'ok',
  remove: 'remove',
  zoom: 'zoom-in',
  zoomo: 'zoom-out',
  off: 'off',
  signal: 'signal',
  cog: 'cog',
  trash: 'trash',
  home: 'home',
  file: 'file',
  time: 'time',
  road: 'road',
  dla: 'download-alt',
  dl: 'download',
  upload: 'upload',
  inbox: 'inbox',
  pcircle: 'play-circle',
  repeat: 'repeat',
  refresh: 'refresh',
  listalt: 'list-alt',
  lock: 'lock',
  flag: 'flag',
  headphones: 'headphones',
  volumeoff: 'volume-off',
  volumedown: 'volume-down',
  volumeup: 'volume-up',
  qrcode: 'qrcode',
  barcode: 'barcode',
  tag: 'tag',
  tags: 'tags',
  book: 'book',
  bookmark: 'bookmark',
  print: 'print',
  camera: 'camera',
  font: 'font',
  bold: 'bold',
  italic: 'italic',
  textheight: 'text-height',
  textwidth: 'text-width',
  alignleft: 'align-left',
  aligncenter: 'align-center',
  alignright: 'align-right',
  alignjustify: 'align-justify',
  list: 'list',
  indentleft: 'indent-left',
  indentright: 'indent-right',
  facetimevideo: 'facetime-video',
  picture: 'picture',
  mapm: 'map-marker',
  adjust: 'adjust',
  tint: 'tint',
  edit: 'edit',
  share: 'share',
  check: 'check',
  move: 'move',
  stepbackward: 'step-backward',
  fastbackward: 'fast-backward',
  backward: 'backward',
  play: 'play',
  pause: 'pause',
  stop: 'stop',
  forward: 'forward',
  ff: 'fast-forward',
  sf: 'step-forward',
  eject: 'eject',
  left: 'chevron-left',
  right: 'chevron-right',
  plussign: 'plus-sign',
  minussign: 'minus-sign',
  removesign: 'remove-sign',
  oks: 'ok-sign',
  questionsign: 'question-sign',
  infosign: 'info-sign',
  screenshot: 'screenshot',
  removecircle: 'remove-circle',
  okcircle: 'ok-circle',
  bancircle: 'ban-circle',
  arrowleft: 'arrow-left',
  arrowright: 'arrow-right',
  arrowup: 'arrow-up',
  arrowdown: 'arrow-down',
  sharealt: 'share-alt',
  resizefull: 'resize-full',
  resizesmall: 'resize-small',
  exclamationsign: 'exclamation-sign',
  gift: 'gift',
  leaf: 'leaf',
  fire: 'fire',
  eyeopen: 'eye-open',
  eyeclose: 'eye-close',
  warningsign: 'warning-sign',
  plane: 'plane',
  calendar: 'calendar',
  random: 'random',
  comment: 'comment',
  magnet: 'magnet',
  chevronup: 'chevron-up',
  chevrondown: 'chevron-down',
  retweet: 'retweet',
  shoppingcart: 'shopping-cart',
  folderclose: 'folder-close',
  folderopen: 'folder-open',
  resizevertical: 'resize-vertical',
  resizehorizontal: 'resize-horizontal',
  hdd: 'hdd',
  bullhorn: 'bullhorn',
  bell: 'bell',
  certificate: 'certificate',
  thumbsup: 'thumbs-up',
  thumbsdown: 'thumbs-down',
  handright: 'hand-right',
  handleft: 'hand-left',
  handup: 'hand-up',
  handdown: 'hand-down',
  circlear: 'circle-arrow-right',
  circleal: 'circle-arrow-left',
  circleau: 'circle-arrow-up',
  circlead: 'circle-arrow-down',
  globe: 'globe',
  wrench: 'wrench',
  tasks: 'tasks',
  filter: 'filter',
  briefcase: 'briefcase',
  fullscreen: 'fullscreen',
  dashboard: 'dashboard',
  paperclip: 'paperclip',
  heartempty: 'heart-empty',
  link: 'link',
  phone: 'phone',
  pushpin: 'pushpin',
  usd: 'usd',
  gbp: 'gbp',
  sort: 'sort',
  sortbyalphabet: 'sort-by-alphabet',
  sortalphabetalt: 'sort-by-alphabet-alt',
  sortorder: 'sort-by-order',
  sortalt: 'sort-by-order-alt',
  sortattributes: 'sort-by-attributes',
  sortattributesalt: 'sort-by-attributes-alt',
  unchecked: 'unchecked',
  expand: 'expand',
  collapsedown: 'collapse-down',
  collapseup: 'collapse-up',
  login: 'log-in',
  flash: 'flash',
  logout: 'log-out',
  newwindow: 'new-window',
  record: 'record',
  save: 'save',
  open: 'open',
  saved: 'saved',
  imports: 'import',
  export: 'export',
  send: 'send',
  floppydisk: 'floppy-disk',
  floppysaved: 'floppy-saved',
  floppyremove: 'floppy-remove',
  floppysave: 'floppy-save',
  floppyopen: 'floppy-open',
  creditcard: 'credit-card',
  transfer: 'transfer',
  cutlery: 'cutlery',
  header: 'header',
  compressed: 'compressed',
  earphone: 'earphone',
  phonealt: 'phone-alt',
  tower: 'tower',
  stats: 'stats',
  sdvideo: 'sd-video',
  hdvideo: 'hd-video',
  subtitles: 'subtitles',
  soundstereo: 'sound-stereo',
  sounddolby: 'sound-dolby',
  sound51: 'sound-5-1',
  sound61: 'sound-6-1',
  sound71: 'sound-7-1',
  copyrightmark: 'copyright-mark',
  registrationmark: 'registration-mark',
  clouddl: 'cloud-download',
  cloudupl: 'cloud-upload',
  treec: 'tree-conifer',
  treedeciduous: 'tree-deciduous'
}

var IconSelect = React.createClass({
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
      props.className += " reacticus-icon reacticus-select";
    } else {
      props.className = "reacticus-icon reacticus-select";
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
        changeEvent.target = this.getDOMNode();
        changeEvent.target.value = value;
        if (this.props.name) {
          changeEvent.target.name = this.props.name;
        }
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
    this.setState({displayOptions: !this.state.displayOptions, search: null})
  },
  onBlur: function(event) {
    if (this.state.displayOptions) {
      this.setState({displayOptions: false})
    }
  },
  getDisplayLabel: function() {
    if(this.state.value){
      var icon = "large-icons glyphicon glyphicon-"+ this.state.value,
      body = <span className={icon}></span>
    }
    var inherit = {
      width: '60px',
      margin: '0',
      padding: '0',
      height: 'inherit'
    }
    if(body) return <div>
      {body}
      <input style={inherit} type="text" onChange={this.search} placeholder="Search" />
      </div>
    return <input style={inherit} type="text" onChange={this.search} placeholder="Search Icons" />
  },
  componentDidMount: function() {
    window.addEventListener("click", this.onBlur)
  },
  componentWillUnmount: function() {
    window.removeEventListener("click", this.onBlur)
  },
  search: function(e){
    var search = e.target.value.toLowerCase()
    this.setState({search: search})
  },
  getOptions: function() {
    var currentValue = this.state.value,
        self = this;
    return _.map(icons, function(child, index) {
      var value = child,
          icon = "large-icons glyphicon glyphicon-"+ value,
          body = <span className={icon}></span>
      if(self.state.search){
        if(child.indexOf(self.state.search) <= -1) return null
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
    var selectClass = "reacticus-selection " + baseClass;
    return <div {...this.getComputedProps()}>
      <div className="current-value" key="display" onClick={this.onClick}>{this.getDisplayLabel()}</div>
      <ul className={selectClass} key="options">{this.getOptions()}</ul>
    </div>
  }
});
