'use strict';
const Immutable = require('immutable');

const UserReducer = function(state=Immutable.Map(),action){
  switch(action.type){
  case 'user.merge':

    return state.mergeDeep(action.user);
  default:
    return state;
  }
};

module.exports = UserReducer;