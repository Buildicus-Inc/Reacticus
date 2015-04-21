'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.gettext = gettext;
exports.walkAndTranslate = walkAndTranslate;
exports.makeSimpleTranslationTag = makeSimpleTranslationTag;
exports.makeSimpleTranslationTagWithPlaceholder = makeSimpleTranslationTagWithPlaceholder;
exports.createElement = createElement;

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var TextSeen = {};
exports.TextSeen = TextSeen;
var innerGettext = function innerGettext(str) {
  return str;
};

function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != '' ? transformToAssocArray(prmstr) : {};
};

function transformToAssocArray(prmstr) {
  var params = {};
  var prmarr = prmstr.split('&');
  for (var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split('=');
    params[tmparr[0]] = tmparr[1];
  }
  return params;
};

function placeholderText(astr) {
  var ret = '';
  for (var i = 0; i < astr.length; i++) {
    ret += 'x';
  }
  return ret;
};

if (typeof window != 'undefined') {
  window.gettextSeen = TextSeen;
  if (getSearchParameters().xxTranslationStrings) {
    innerGettext = placeholderText;
  } else if (window.gettext) {
    innerGettext = window.gettext;
  } else if (window.django) {
    innerGettext = window.django.gettext;
  }
}

function gettext(str) {
  str = str.trimLeft();
  var cstr = str.trimRight();
  TextSeen[cstr] = true;

  var gcstr = innerGettext(cstr);
  if (gcstr !== cstr) {
    if (str.length > cstr.length) {
      return gcstr + ' ';
    }return gcstr;
  }
  return innerGettext(str);
}

;

function walkAndTranslate(arg) {
  if (_import2['default'].isString(arg)) {
    return gettext(arg);
  }
  if (_import2['default'].isArray(arg)) {
    return _import2['default'].map(arg, walkAndTranslate);
  }
  return arg;
}

;

function makeSimpleTranslationTag(tagname, props, children) {
  var args = _import2['default'].toArray(arguments);
  args[2] = walkAndTranslate(children);
  return _React2['default'].createElement.apply(this, args);
}

;

function makeSimpleTranslationTagWithPlaceholder(tagname, props, children) {
  var args = _import2['default'].toArray(arguments);
  args[2] = walkAndTranslate(children);
  var props = _import2['default'].clone(props);
  if (_import2['default'].isString(props.placeholder)) {
    props.placeholder = gettext(props.placeholder);
  }
  args[1] = props;
  return _React2['default'].createElement.apply(this, args);
}

;

//TODO support generic DOM elements in I18n tag
var I18n = _React2['default'].createClass({
  displayName: 'I18n',

  getInitialState: _import2['default'].constant({}),
  render: function render() {
    return _React2['default'].createElement(
      'span',
      null,
      walkAndTranslate(this.props.children)
    );
  }
});

exports.I18n = I18n;

function createElement(tag) {
  var args = _import2['default'].toArray(arguments);
  if (_import2['default'].contains(textTags, tag)) {
    return makeSimpleTranslationTag.apply(this, args);
  }
  if (_import2['default'].contains(inputTags, tag)) {
    return makeSimpleTranslationTagWithPlaceholder.apply(this, args);
  }
  return _React2['default'].createElement.apply(this, args);
}

;

var textTags = ['label', 'span', 'p', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'li', 'option', 'div', 'b', 'i', 'strong', 'emphasis'];
var inputTags = ['input', 'textarea'];

//for drop in i18n, import this as React
var I18nReact = _import2['default'].merge({}, _React2['default'], {
  createElement: createElement });
exports.I18nReact = I18nReact;