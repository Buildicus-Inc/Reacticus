import _ from 'lodash';
import React from 'react';

export var TextSeen = {};
var innerGettext = function(str) {
  return str;
};

function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
};

function transformToAssocArray( prmstr ) {
  var params = {};
  var prmarr = prmstr.split("&");
  for ( var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
  }
  return params;
};

function placeholderText(astr) {
  var ret = '';
  for (var i=0; i<astr.length; i++) {
    ret += 'x';
  }
  return ret;
};


if (typeof window != "undefined") {
  window.gettextSeen = TextSeen;
  if (getSearchParameters().xxTranslationStrings) {
    innerGettext = placeholderText;
  } else if (window.gettext) {
    innerGettext = window.gettext;
  } else if (window.django) {
    innerGettext = window.django.gettext;
  }
}

export function gettext(str) {
  str = str.trimLeft();
  var cstr = str.trimRight();
  TextSeen[cstr] = true;

  var gcstr = innerGettext(cstr);
  if (gcstr !== cstr) {
    if (str.length > cstr.length) return gcstr + " ";
    return gcstr;
  }
  return innerGettext(str);
};

export function walkAndTranslate(arg) {
  if (_.isString(arg)) {
    return gettext(arg)
  }
  if (_.isArray(arg)) {
    return _.map(arg, walkAndTranslate);
  }
  return arg;
};


export function makeSimpleTranslationTag(tagname, props, children) {
  var args = _.toArray(arguments);
  args[2] = walkAndTranslate(children);
  return React.createElement.apply(this, args);
};

export function makeSimpleTranslationTagWithPlaceholder(tagname, props, children) {
  var args = _.toArray(arguments);
  args[2] = walkAndTranslate(children);
  var props = _.clone(props);
  if (_.isString(props.placeholder)) {
    props.placeholder = gettext(props.placeholder);
  }
  args[1] = props;
  return React.createElement.apply(this, args);
};

//TODO support generic DOM elements in I18n tag
export var I18n = React.createClass({
  getInitialState: _.constant({}),
  render: function() {
    return <span>{walkAndTranslate(this.props.children)}</span>
  }
});

export function createElement(tag) {
  var args = _.toArray(arguments);
  if (_.contains(textTags, tag)) {
    return makeSimpleTranslationTag.apply(this, args);
  }
  if (_.contains(inputTags, tag)) {
    return makeSimpleTranslationTagWithPlaceholder.apply(this, args);
  }
  return React.createElement.apply(this, args);
};


var textTags = ['label', 'span', 'p', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'li', 'option', 'div', 'b', 'i', 'strong', 'emphasis'];
var inputTags = ['input', 'textarea'];

//for drop in i18n, import this as React
export var I18nReact = _.merge({}, React, {
  createElement: createElement,
});
