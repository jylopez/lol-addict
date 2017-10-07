'use strict';
const Immutable = require('immutable');

const ResourceGroupsReducer = function(state=Immutable.List(),action){
  switch(action.type){
  case 'resourceGroups.merge':
    return state.mergeDeep(action.resourceGroups);
  default:
    return state;
  }
};

module.exports = ResourceGroupsReducer;