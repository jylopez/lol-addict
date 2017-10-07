'use strict';
const Promise = require('bluebird');
const superagent = require('superagent');
const keyBy = require('lodash/keyBy');

const ResourcesActions = {
  index: function(){
  	return new Promise(function(resolve,reject){
      superagent.get('/api/resources').end((err,res) => {
        if(err){ reject(err); }
        console.log('resources', res.body.resources)
        resolve(res.body.resources);
      });
    });
  }
};

module.exports = ResourcesActions;