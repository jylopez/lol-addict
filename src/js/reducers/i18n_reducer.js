'use strict';
const mf = require('messageformat');

// each of these are an object of functions
// https://messageformat.github.io/build/
const en = new mf('en').compile(require('../../../locales/en'));
const es = new mf('es').compile(require('../../../locales/es'));
const it = new mf('it').compile(require('../../../locales/it'));
const ja = new mf('ja').compile(require('../../../locales/ja'));

const _messages = function(locale){
  switch(locale){
  case 'en':
    return en;
  case 'es':
    return es;
  case 'it':
    return it;
  case 'ja':
    return ja;
  }
};

const _generateState = function(locale){
  return {
    locale: locale,
    messages: _messages(locale),
    defaultMessages: _messages('en'),
  };
};

const i18nReducer = function(state=_generateState('en'),action){
  switch(action.type){
  case 'i18n.update_locale':
    return _generateState(action.locale);
  default:
    return state;
  }
};

module.exports = i18nReducer;