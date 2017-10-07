'use strict';
const Immutable = require('immutable');

const ResourcesReducer = function(state=Immutable.List(),action){
  switch(action.type){
  case 'resources.merge':
    return state.mergeDeep(action.resources);
  default:
    return state;
  }
};

module.exports = ResourcesReducer;