'use strict';
const reduce = require('lodash/reduce');
const has = require('lodash/has');

const ParamsHelpers = {
  // takes an object of params and an object whitelist
  // whitelist should be in the format { key: (true|false) }
  // where true or false is whether the param is required
  // for as many keys as you want
  // can be made recursive if we need that
  // if required, param is set to null. can also raise if setting to null doesnt work.
  strongParams: function(params,whitelist){
    return reduce(whitelist,(p,required,key) => {
      if( has(params,key) ){
        p[key] = params[key];
      } else if(required){
        p[key] = null;
      }
      return p;
    },{});
  }
};

module.exports = ParamsHelpers;