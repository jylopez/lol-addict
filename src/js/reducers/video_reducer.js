'use strict';
const Immutable = require('immutable');

const VideoReducer = function(state=Immutable.Map(),action){
  switch(action.type){
  case 'video.merge':
    return state.mergeDeep(action.video);
  default:
    return state;
  }
};

module.exports = VideoReducer;