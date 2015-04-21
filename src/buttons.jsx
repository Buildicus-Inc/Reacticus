import _ from 'lodash';
import React from 'react';
import Kefir from 'kefir';
import {BinderMixin} from 'refluxxor';

export var SectionToggleEvent = Kefir.emitter();
//SectionToggleEvent.emit({section: foo, activeType: bar})

export var ToggleMixin = {
  getInitialState: function() {
    return {active: this.props.default || this.props.active || false}
  },
  getComputedProps: function(moreProps) {
    return _.merge({"data-active": this.state.active ? 1 : 0}, this.props, moreProps)
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.active !== undefined) {
      this.setState({active: nextProps.active});
    }
  }
};

export var ToggleButton = React.createClass({
  /* A button with a data-toggle that toggles from 1 to 0 everytime it is clicked */
  mixins: [ToggleMixin],
  onClick: function(event) {
    this.setState({active: !this.state.active})
    if (this.props.onClick) {
      return this.props.onClick(event)
    }
  },
  render: function() {
    return <button {...this.getComputedProps({onClick: this.onClick, style: {display: 'inline'}})}>{this.props.children}</button>
  }
});

export var SectionToggleButton = React.createClass({
  /* A button with a data-toggle that tied to props.section */
  mixins: [ToggleMixin, BinderMixin],
  propTypes: {
    section: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    //reactjs broke this?
    return {'id': _.uniqueId()}
  },
  componentWillMount: function() {
    this.bindTo(SectionToggleEvent.filter(x => x.section === this.props.sections), (data) => {
      this.setState({active: (data.activeType === this.props.id)});
    });
  },
  onClick: function(event) {
    if (this.state.active) {
      event.preventDefault()
      return
    }
    SectionToggleEvent.emit({
      section: this.props.section,
      activeType: this.props.id,
    });
    if (this.props.onClick) {
      return this.props.onClick(event)
    }
  },
  render: function() {
    return <div {...this.getComputedProps({onClick: this.onClick})}>{this.props.children}</div>
  }
});
