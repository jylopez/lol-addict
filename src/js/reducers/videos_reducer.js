'use strict';
const Immutable = require('immutable');

const VideosReducer = function(state=Immutable.List(),action){
  switch(action.type){
  case 'videos.merge':
    return state.mergeDeep(action.videos);
  default:
    return state;
  }
};

module.exports = VideosReducer;