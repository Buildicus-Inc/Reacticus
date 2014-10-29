/** @jsx React.DOM */

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


export function makeSimpleTranslationTag(tagname) {
  return React.createClass({
    render: function() {
      return React.createElement(tagname, this.props, walkAndTranslate(this.props.children));
    }
  });
};

export function makeSimpleTranslationTagWithPlaceholder(tagname) {
  return React.createClass({
    render: function() {
      var props = _.clone(this.props);
      if (_.isString(props.placeholder)) {
        props.placeholder = gettext(props.placeholder)
      }
      return React.createElement(tagname, props, walkAndTranslate(props.children));
    }
  });
};

export var input = makeSimpleTranslationTagWithPlaceholder('input');
export var textarea = makeSimpleTranslationTagWithPlaceholder('textarea');

//TODO support generic DOM elements in I18n tag
export var I18n = React.createClass({
  render: function() {
    return <span>{walkAndTranslate(this.props.children)}</span>
  }
});


var shimTags = ['label', 'span', 'p', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'li', 'option', 'div', 'b', 'i', 'strong', 'emphasis'];

export var i18nDOM = _.reduce(_.map(shimTags, function(key) {
  return {key:key, tag:makeSimpleTranslationTag(key)}
}), function(result, val) {
  result[val.key] = val.tag;
  return result;
}, {
  I18n: I18n,
  input: input,
  textarea: textarea
});

export default = i18nDOM;
