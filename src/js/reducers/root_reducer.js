'use strict';
const { combineReducers } = require('redux');
const { routerReducer } = require('react-router-redux');
const ReduxForm = require('redux-form');

const user = require('./user_reducer');
const flash = require('./flash_reducer');

const RootReducer = combineReducers({
  user: user,
  routing: routerReducer,
  flash: flash,
  form: ReduxForm.reducer
});

module.exports = RootReducer;