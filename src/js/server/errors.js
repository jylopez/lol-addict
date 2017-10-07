'use strict';
const express = require('express');

const Errors = {
  init: function(app){

    app.use(function(req, res) {
      res.status(404);
      res.render('errors/404')
    })

    app.use(function(err, req, res, next) {
      if (res.headersSent) {
        return next(err)
      }
      console.log('>>> Error: ', err)
      res.status(500);
      res.render('errors/500')
    })
  }
};

module.exports = Errors;