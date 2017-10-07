'use strict';
const { combineReducers } = require('redux');
const { routerReducer } = require('react-router-redux');
const ReduxForm = require('redux-form');

const i18n = require('./i18n_reducer');
const user = require('./user_reducer');
const flash = require('./flash_reducer');
const videos = require('./videos_reducer');
const video = require('./video_reducer');
const resources = require('./resources_reducer');
const resourceGroups = require('./resource_groups_reducer');

const RootReducer = combineReducers({
  i18n: i18n,
  user: user,
  routing: routerReducer,
  flash: flash,
  form: ReduxForm.reducer,
  videos: videos,
  video: video,
  resources: resources,
  resourceGroups: resourceGroups
});

module.exports = RootReducer;