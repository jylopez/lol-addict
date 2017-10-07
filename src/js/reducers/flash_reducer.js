'use strict';
const Immutable = require('immutable');

const FlashReducer = function(state=Immutable.List(),action){
  switch(action.type){
  case 'flash.push':
    return state.push(Immutable.fromJS(action.flash));
  case 'flash.dismiss':
    return state.filter(f => f.get('keyPath') !== action.keyPath);
  default:
    return state;
  }
};

module.exports = FlashReducer;