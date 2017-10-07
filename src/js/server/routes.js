'use strict';
const express = require('express');
const AppController = require('../controllers/app_controller');
const UsersController = require('../controllers/users_controller');

const Routes = {
  init: function(app){

    const api = express.Router();
    api.post('/users', UsersController.new);
    app.use('/api', api);

    app.get('/', AppController.index);
    app.get('*', AppController.index)
    
  }
};

module.exports = Routes;