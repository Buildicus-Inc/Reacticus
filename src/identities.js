import React from 'react';
import _ from 'lodash';

export function isComponent(obj) {
  //ghetto check because JS
  return (obj && obj.props !== undefined)
};

var knownInputs = [
  'input',
  'textarea',
  'select'
];

export function isInput(vd) {
  if (vd && vd.type) {
    if (vd.type.propTypes && vd.type.propTypes.value) return true;
    return _.contains(knownInputs, vd.type);
  }
  return false;
};

export function deepCloneComponent(tpl, propCallback) {
  if (!tpl) return tpl;
  if (_.isArray(tpl)) {
    return _.map(tpl, function(component) {
      return deepCloneComponent(component, propCallback);
    })
  }
  if (!isComponent(tpl)) return _.clone(tpl);
  //The mysteries of react v12 is that the objects are structured differently depending if you are using the minified version!
  var new_props = _.clone(tpl._store ? tpl._store.props : tpl.props);
  if (new_props) new_props.children = deepCloneComponent(new_props.children, propCallback);
  if (propCallback) propCallback(tpl, new_props);

  var t = tpl.type;
  if (!_.isString(t)) {
    return React.cloneElement(tpl, new_props);
  }
  return React.createElement(t, new_props);
};
