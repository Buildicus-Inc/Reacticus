'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _isComponent$isInput$deepCloneComponent = require('./identities');

/*
  <ListField onChange={this.receiveData} defaultValue={[{item: "foo"}]}>
    <label>Item</label>
    <input name=”item”/>
  </ListField>
*/

var DragBar = _React2['default'].createClass({
  displayName: 'DragBar',

  getInitialState: function getInitialState() {
    return {
      hover: false
    };
  },
  render: function render() {
    var self = this;
    return _React2['default'].createElement('i', _extends({}, this.props, {
      className: 'bif bif-bars',
      draggable: 'true',
      //provides drag
      onDragStart: function (event) {
        //start drag operation
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('application/listfield-rpc', JSON.stringify({ index: self.props.position }));
      },
      onDrag: function (event) {},
      onDragEnd: function (event) {}
    }));
  }
});

exports.DragBar = DragBar;
function findInputs(struct) {
  return _import2['default'].filter(_import2['default'].map(_import2['default'].flatten([struct]), function (vd) {
    //if the DOM element has a value propType we assume it is an input
    if (_isComponent$isInput$deepCloneComponent.isInput(vd)) return vd;
  }));
}

function findInput(struct, name) {
  return _import2['default'].first(_import2['default'].filter(findInputs(struct), function (input) {
    return input.props.name === name;
  }));
}

var ListField = _React2['default'].createClass({
  displayName: 'ListField',

  getStateFromValue: function getStateFromValue(value, prevValue) {
    var state = {
      value: value,
      count: _import2['default'].size(value) + 1 };
    if (prevValue) {
      state.identities = this.state.identities.slice(0, state.count - 1);
      var toAdd = state.count - _import2['default'].size(state.identities);
      if (toAdd > 0) {
        state.identities.push.apply(state.identities, _import2['default'].map(_import2['default'].range(toAdd), _import2['default'].uniqueId));
      }
    } else {
      state.identities = _import2['default'].map(_import2['default'].range(state.count), _import2['default'].uniqueId);
    }
    return state;
  },
  getInitialState: function getInitialState() {
    var value = this.props.value || this.props.defaultValue || [];
    return this.getStateFromValue(value);
  },
  getDefaultProps: function getDefaultProps() {
    return { dataType: 'object' };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!_import2['default'].isUndefined(nextProps.value)) this.setState(this.getStateFromValue(nextProps.value, this.state.value));
  },
  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (!_import2['default'].isUndefined(nextProps.value) && nextProps.value != nextState.value) {
      nextState = _import2['default'].extend(nextState, this.getStateFromValue(nextProps.value, nextState.value));
    }
    if (nextState.value == null || nextState.value == undefined) {
      nextState.value = [];
    }
  },
  addItem: function addItem(event) {
    event.preventDefault();
    var identities = _import2['default'].clone(this.state.identities);
    identities.push(_import2['default'].uniqueId());
    this.setState({
      identities: identities,
      count: _import2['default'].size(identities)
    });
  },
  removeItem: function removeItem(event) {
    event.preventDefault();
    var index = event.target.dataset.index;
    if (index === undefined) {
      return;
    }var value = _import2['default'].clone(this.state.value);
    value.splice(index, 1);

    var identities = _import2['default'].clone(this.state.identities);
    identities.splice(index, 1);

    this.setState({
      value: value,
      identities: identities,
      count: _import2['default'].size(identities)
    });
    this.notifyChange(value);
  },
  moveItem: function moveItem(from, to) {
    var value = _import2['default'].cloneDeep(this.state.value),
        identities = _import2['default'].clone(this.state.identities),
        fromIdentity = identities.splice(from, 1)[0],
        fromVal = value.splice(from, 1)[0];
    value.splice(to, 0, fromVal);
    identities.splice(to, 0, fromIdentity);

    this.setState({
      value: value,
      identities: identities
    });
    this.notifyChange(value);
  },
  onDragEnter: function onDragEnter(event) {
    if (_import2['default'].contains(event.dataTransfer.types, 'application/listfield-rpc')) {
      event.preventDefault();
    }
  },
  onDragLeave: function onDragLeave(event) {},
  onDragOver: function onDragOver(event) {
    event.preventDefault();
  },
  onDrop: function onDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    var payload = event.dataTransfer.getData('application/listfield-rpc'),
        cmd = JSON.parse(payload),
        position = event.target.dataset.position;
    if (position === undefined) {
      return;
    }if (event.dataTransfer.effectAllowed == 'move') {
      this.moveItem(cmd.index, position);
    }
  },
  newLineOnEnter: function newLineOnEnter(event) {
    if (event.keyCode == 13) {
      this.addItem(event);
    }
  },
  renderChildren: function renderChildren() {
    var self = this,
        values = this.state.value,
        dataType = this.props.dataType,
        removeItem = this.removeItem,
        receiveData = this.receiveData,
        childTpl = this.props.children,
        tgValue = this.props.value !== undefined ? 'value' : 'defaultValue';

    return _import2['default'].map(this.state.identities, function (identity, index) {
      var value = values ? values[index] : undefined;
      value = _import2['default'].isUndefined(value) ? null : value;

      function updateProps(vd, props) {
        //this is an input field

        if (_isComponent$isInput$deepCloneComponent.isInput(vd)) {
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
            props.onKeyUp = self.newLineOnEnter;
          }
        }
      }

      var result = _isComponent$isInput$deepCloneComponent.deepCloneComponent(childTpl, updateProps);

      return _React2['default'].createElement(
        'div',
        { className: 'listitem-container', key: identity, 'data-position': index,
          onDragEnter: self.onDragEnter, onDragLeave: self.onDragLeave, onDragOver: self.onDragOver, onDrop: self.onDrop },
        _React2['default'].createElement(DragBar, { key: 'drag', className: 'listitem-dragbar', position: index, 'data-position': index }),
        _React2['default'].createElement(
          'div',
          { key: 'container', className: 'listitem-fieldcontainer', 'data-position': index },
          result
        ),
        _React2['default'].createElement('i', { className: 'listitem-remove bif bif-trash-o', key: 'remove-item', 'data-index': index, onClick: removeItem })
      );
    });
  },
  receiveData: function receiveData(event) {
    var values = this.state.value,
        index,
        value,
        name;

    if (event.component) {
      index = event.component.props['data-index'];
      value = _import2['default'].isUndefined(event.value) ? event.component.state.value : event.value;
      name = event.component.props.name;
    } else {
      index = event.target.dataset.index;
      value = event.target.value;
      name = event.target.name;
      if (event.target.type == 'checkbox') {
        value = event.target.checked ? value || true : false;
      }
    }
    if (index === undefined) {
      return;
    }if (this.props.dataType == 'array') {
      values[index] = value || '';
    } else {
      if (!values[index]) values[index] = {};
      values[index][name] = value;
    }

    this.setState({ value: values });
    this.notifyChange(values);
  },
  notifyChange: function notifyChange(value) {
    //console.log("listField.notifyChange:", value);
    if (this.props.onChange) {
      var event = {
        type: 'input',
        component: this,
        value: value
      };
      this.props.onChange(event);
    }
    if (this.props.onValue) {
      this.props.onValue(value);
    }
  },
  render: function render() {
    return _React2['default'].createElement(
      'div',
      _extends({ key: 'listfield', className: 'reacticus-listfield' }, this.props),
      this.renderChildren(),
      _React2['default'].createElement('i', { key: 'add-item', className: 'listitem-add bif bif-plus', onClick: this.addItem })
    );
  }
});
exports.ListField = ListField;

//console.log('drag', event)

//console.log('finish it')
//console.log("enter:", event)
//self.setState({hover: true})

//console.log(event.target)
//this.setState({hover: false})