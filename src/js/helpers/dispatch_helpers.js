'use strict';

const DispatchHelpers = {
  dispatchMerge: function(dispatch,resourceName){
    return function(keyedResourceCollection){
      let action = {type: `${resourceName}.merge`};
      action[resourceName] = keyedResourceCollection;
      dispatch(action);
    };
  },
  dispatchLoad: function(dispatch,resourceName){
    return function(keyedResourceCollection){
      let action = {type: `${resourceName}.load`};
      action[resourceName] = keyedResourceCollection;
      dispatch(action);
    };
  }
};

module.exports = DispatchHelpers;