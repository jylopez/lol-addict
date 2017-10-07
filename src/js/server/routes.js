'use strict';
const express = require('express');

const Auth = require('./auth');
const Role = require('./role');

const AppController = require('../controllers/app_controller');
const VideosController = require('../controllers/videos_controller');
const ResourceGroupsController = require('../controllers/resource_groups_controller');
const ResourcesController = require('../controllers/resources_controller');

const noRedirect = (req, res, next) => {
    delete req.session.redirect_to;
    next()
}

const Routes = {
  init: function(app){

    Auth.init(app);
    Role.init(app);

    // server-rendered routes
    app.get('/', Role.can('access home'), AppController.index);
    app.post('/logout',Role.reqAuth, noRedirect, Auth.logoutHandler());

    // client-rendered routes. included here to facilitate deep linking
    // all should go to AppController.index, all should be get
    app.get('/videos', Role.reqAuth, AppController.index);
    app.get('/resources', Role.reqAuth, AppController.index);

    // api routes that return data only
    const api = express.Router();
    api.use(Role.reqAuth); // every api request should be authorized
    api.get('/videos',VideosController.index);
    api.get('/resource_groups',ResourceGroupsController.index);
    api.get('/resources',ResourcesController.index);

    app.use('/api',api);
  }
};

module.exports = Routes;