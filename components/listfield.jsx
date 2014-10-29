/** @jsx React.DOM */
import React from 'react';
import _ from 'lodash';
import {isComponent, isInput, deepCloneComponent} from './identities';

/*
  <ListField onChange={this.receiveData} defaultValue={[{item: "foo"}]}>
    <label>Item</label>
    <input name=”item”/>
  </ListField>
*/

export var DragBar = React.createClass({
  getInitialState: function() {
    return {
      hover: false
    }
  },
  render: function() {
    var self = this;
    return <i {...this.props}
      className="bif bif-bars"
      draggable="true"
      //provides drag
      onDragStart={function(event) { //start drag operation
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('application/listfield-rpc', JSON.stringify({index: self.props.position}));
      }}
      onDrag={function(event) {
        //console.log('drag', event)
      }}
      onDragEnd={function(event) {
        //console.log('finish it')
      }}
    />
  }
});

function findInputs(struct) {
  return _.filter(_.map(_.flatten([struct]), function(vd) {
    //if the DOM element has a value propType we assume it is an input
    if (isInput(vd)) return vd
  }))
}

function findInput(struct, name) {
  return _.first(_.filter(findInputs(struct), function(input) {
    return input.props.name === name
  }))
}

export var ListField = React.createClass({
  getStateFromValue: function(value, prevValue) {
    var state = {
      value: value,
      count: _.size(value)+1,
    };
    if (prevValue) {
      var toAdd = Math.max(state.count - _.size(this.state.identities), 0);
      state.identities = this.state.identities;
      state.identities.push.apply(state.identities, _.map(_.range(toAdd), _.uniqueId));
    } else {
      state.identities = _.map(_.range(state.count), _.uniqueId)
    }
    return state;
  },
	getInitialState: function(){
    var value = this.props.value || this.props.defaultValue || [];
    return this.getStateFromValue(value);
	},
  getDefaultProps: function() {
    return {dataType: 'object'}
  },
  componentWillReceiveProps: function(nextProps) {
    if (!_.isUndefined(nextProps.value)) this.setState(this.getStateFromValue(nextProps.value, this.state.value));
  },
  componentWillUpdate: function(nextProps, nextState) {
    if (nextProps.value !== undefined && nextProps.value != nextState.value) {
      nextState = _.extend(nextState, this.getStateFromValue(nextProps.value, nextState.value));
    }
  },
  addItem: function(event) {
    event.preventDefault()
    var identities = _.clone(this.state.identities);
    identities.push(_.uniqueId());
    this.setState({
      identities: identities,
      count: _.size(identities)
    })
  },
  removeItem: function(event) {
    event.preventDefault()
    var index = event.target.dataset.index;
    if (index === undefined) return;

    var value = _.clone(this.state.value);
    value.splice(index, 1);

    var identities = _.clone(this.state.identities);
    identities.splice(index, 1);

    this.setState({
      value: value,
      identities: identities,
      count: _.size(identities)
    })
    this.notifyChange(value)
  },
  moveItem: function(from, to) {
    var value = _.cloneDeep(this.state.value),
        identities = _.clone(this.state.identities),
        fromIdentity = identities.splice(from, 1)[0],
        fromVal = value.splice(from, 1)[0];
    value.splice(to, 0, fromVal)
    identities.splice(to, 0, fromIdentity)

    this.setState({
      value: value,
      identities: identities
    })
    this.notifyChange(value)
  },
  onDragEnter: function(event) {
    if (_.contains(event.dataTransfer.types, "application/listfield-rpc")) {
      event.preventDefault()
      //console.log("enter:", event)
      //self.setState({hover: true})
    }
  },
  onDragLeave: function(event) {
    //console.log(event.target)
    //this.setState({hover: false})
  },
  onDragOver: function(event) {
    event.preventDefault()
  },
  onDrop: function(event) {
    event.stopPropagation()
    event.preventDefault()
    var payload = event.dataTransfer.getData("application/listfield-rpc"),
        cmd = JSON.parse(payload),
        position = event.target.dataset.position;
    if (position === undefined) return;
    if (event.dataTransfer.effectAllowed == "move") {
      this.moveItem(cmd.index, position)
    }
  },
  newLineOnEnter: function(event) {
    if(event.keyCode == 13) {
      this.addItem(event);
    }
  },
  renderChildren: function() {
    var self = this,
        values = this.state.value,
        dataType = this.props.dataType,
        removeItem = this.removeItem,
        receiveData = this.receiveData,
        childTpl = this.props.children,
        tgValue = this.props.value !== undefined ? 'value' : 'defaultValue';

    return _.map(this.state.identities, function(identity, index) {
      var value = values[index];
      value = _.isUndefined(value) ? null : value;

      function updateProps(vd, props) {
        //this is an input field

        if(isInput(vd)) {
          props['data-index'] = index;
          props.onChange = receiveData;
          if (value !== undefined) {
            if (dataType == 'array') {
              props[tgValue] = value;
            } else if (dataType == 'pass') {
              props[tgValue] = values;
            } else {
              if (value) props[tgValue] = value[props.name];
            }
          }
          if (props.newLineOnEnter) {
            props.onKeyUp = self.newLineOnEnter
          }
        }
      }

      var result = deepCloneComponent(childTpl, updateProps);

      return (<div className="listitem-container" key={identity} data-position={index}
               onDragEnter={self.onDragEnter} onDragLeave={self.onDragLeave} onDragOver={self.onDragOver} onDrop={self.onDrop}>
        <DragBar key="drag" className="listitem-dragbar" position={index} data-position={index}/>
        <div key="container" className="listitem-fieldcontainer" data-position={index}>
          {result}
        </div>
        <i className="listitem-remove bif bif-trash-o" key="remove-item" data-index={index} onClick={removeItem} />
        </div>);
    });
  },
	receiveData: function(event){
    var values = this.state.value,
        index, value, name;

    if (event.component) {
      index = event.component.props['data-index'];
      value = _.isUndefined(event.value) ? event.component.state.value : event.value;
      name = event.component.props.name;
    } else {
      index = event.target.dataset.index;
      value = event.target.value;
      name = event.target.name;
      if (event.target.type == "checkbox") {
        value = event.target.checked ? (value || true) : false;
      }
    }
    if (index === undefined) return;

    if (this.props.dataType == "array") {
      //if (values[index] === undefined) values[index] = []
      values[index] = value
    } else {
      if (!values[index]) values[index] = {}
      values[index][name] = value
    }

    this.setState({value: values})
    this.notifyChange(values)
	},
  notifyChange: function(value) {
    //console.log("listField.notifyChange:", value);
    if (this.props.onChange) {
      var event = {
        type: 'input',
        component: this,
        value: value
      }
      this.props.onChange(event);
    }
    if (this.props.onValue) {
      this.props.onValue(value)
    }
  },
	render: function() {
    return (<div key="listfield" className="reacticus-listfield">
      {this.renderChildren()}
      <i key="add-item" className="listitem-add bif bif-plus" onClick={this.addItem}/>
      </div>);
	}
});
