'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isComponent = isComponent;
exports.isInput = isInput;
exports.deepCloneComponent = deepCloneComponent;

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

function isComponent(obj) {
  //ghetto check because JS
  return obj && obj.props !== undefined;
}

;

var knownInputs = ['input', 'textarea', 'select'];

function isInput(vd) {
  if (vd && vd.type) {
    if (vd.type.propTypes && vd.type.propTypes.value) {
      return true;
    }return _import2['default'].contains(knownInputs, vd.type);
  }
  return false;
}

;

function deepCloneComponent(tpl, propCallback) {
  if (!tpl) {
    return tpl;
  }if (_import2['default'].isArray(tpl)) {
    return _import2['default'].map(tpl, function (component) {
      return deepCloneComponent(component, propCallback);
    });
  }
  if (!isComponent(tpl)) {
    return _import2['default'].clone(tpl);
  } //The mysteries of react v12 is that the objects are structured differently depending if you are using the minified version!
  var new_props = _import2['default'].clone(tpl._store ? tpl._store.props : tpl.props);
  if (new_props) new_props.children = deepCloneComponent(new_props.children, propCallback);
  if (propCallback) propCallback(tpl, new_props);

  var t = tpl.type;
  if (!_import2['default'].isString(t)) {
    return _React2['default'].cloneElement(tpl, new_props);
  }
  return _React2['default'].createElement(t, new_props);
}

;