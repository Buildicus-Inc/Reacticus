import _ from 'lodash';
import React from 'react';

export var Tabs = React.createClass({
  /* A button with a data-toggle that tied to props.section */
  propTypes: {
    sections: React.PropTypes.object,
    labels: React.PropTypes.object,
    collapseable: React.PropTypes.bool,
    active: React.PropTypes.string,
    defaultTab: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      collapseable: true
    };
  },
  getInitialState: function() {
    return {
      active: this.props.active || this.props.defaultTab || _.first(_.keys(this.props.sections)),
      collapsed: false
    }
  },
  onClick: function(key, event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.props.collapseable && this.state.active === key) {
      this.setState({collapsed: !this.state.collapsed});
    } else {
      this.setState({active: key});
    }
  },
  isActive: function(slug) {
    return (this.state.active === slug && !this.state.collapsed) ? "1" : "0";
  },
  renderTabButton: function(section) {
    var label = this.props.labels[section];
    var cName = "vbtn vbtn-"+section;
    var active = this.isActive(section);
    var onClick = this.onClick.bind(this, section);
    return <li className={cName} data-active={active} onClick={onClick} key={section}>{label}</li>
  },
  renderSection: function(section, key) {
    var active = this.isActive(key);
    var cName = "panel-"+key;
    if(section.props.children) cName = 'panel-'+section.props.children.props.sectionIcon
    return <section className={cName} data-active={active} key={key}>
      {section}
    </section>
  },
  renderSections: function() {
    return _.map(this.props.sections, this.renderSection);
  },
  renderNav: function() {
    return _.map(_.keys(this.props.sections), this.renderTabButton);
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.sections !== this.props.sections &&
        nextProps.sections && !nextProps.sections[this.state.active]) {
      var active = nextProps.active || nextProps.defaultTab || _.first(_.keys(nextProps.sections));
      this.setState({active: active});
    }
  },
  render: function() {
    var displayClasses = "reacticus-tab-display";
    if (this.props.collapseable) {
      displayClasses += " collapseable";
      if (this.state.collapsed) {
        displayClasses += " collapsed";
      }
    }

    return <div className="reacticus-tab">
      <ul className="reacticus-tab-nav" key="nav">
        {this.renderNav()}
      </ul>
      <div className={displayClasses} key="display">
        {this.renderSections()}
      </div>
    </div>
  }
});
