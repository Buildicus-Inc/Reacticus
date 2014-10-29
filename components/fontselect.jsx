/** @jsx React.DOM */

import _ from 'lodash';
import React from 'react';
import {Select} from './select';

export var FontSelect = React.createClass({
  contextTypes: {
    site: React.PropTypes.object
  },
  getInitialState: function(){
    return {fonts: this.props.fonts};
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.fonts) {
      this.setState({fonts: nextProps.fonts});
    }
  },
  getDefaultProps: function() {
    return {
      className: "fontSelect", //TODO reacticus-fontselect
      fonts: [
        'Wire One',
        'Courier New',
        'Droid Sans Mono',
        'Ubuntu Mono',
        'Arial',
        'Droid Sans',
        'Fjalla One',
        'Lato',
        'Open Sans',
        'Oswald',
        'Quicksand',
        'Source Sans Pro',
        'Ubuntu',
        'Verdana',
        'Droid Serif',
        'Georgia',
        'Rokkitt',
        'Times New Roman',
        'Oregano',
        'Nova Flat',
        'Alex Brush'
      ]
    }
  },
  getOptions: function() {
    return _.map(this.state.fonts, function(font, index) {
      return <option key={index} value={font} style={{fontFamily: font}}>{font}</option>
    });
  },
  render: function() {
    return <Select {...this.props}>{this.getOptions()}</Select>;
  }
});
