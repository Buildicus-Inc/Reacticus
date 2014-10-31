var React = require('react');

function isComponent(obj) {
  //ghetto check because JS
  return (obj && obj._owner !== undefined)
};

function isInput(vd) {
  return (vd && vd.type && vd.type.propTypes && vd.type.propTypes.value)
};

function deepCloneComponent(tpl, propCallback) {
  if (!tpl) return tpl;
  if (_.isArray(tpl)) {
    return _.map(tpl, function(component) {
      return deepCloneComponent(component, propCallback);
    })
  }
  if (!isComponent(tpl)) return _.clone(tpl)
  var new_props = _.clone(tpl.props);
  if (new_props) new_props.children = deepCloneComponent(new_props.children, propCallback);
  if (propCallback) propCallback(tpl, new_props)
  //  console.log("cloning:", tpl);
  //return tpl.__proto__.constructor.cloneAndReplaceProps.call(tpl, new_props);
  //TODO fix this:
  return React.createElement(tpl.type, new_props);
};
