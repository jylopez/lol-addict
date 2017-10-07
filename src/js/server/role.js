'use strict';
var ConnectRoles = require('connect-roles');
var Immutable = require('immutable');

var role = new ConnectRoles({
  failureHandler: function(req, res, action) {
    if (!req.isAuthenticated()) {
      redirectToLogin(req, res);
    } else {
      denyAccess(req, res, action)
    }
  }
});

function denyAccess (req, res, action) {
  var accept = req.headers.accept || '';
  res.status(403);
  if (~accept.indexOf('html')) {
    res.render('access-denied', {action: action});
  } else {
    res.send('Access Denied - You don\'t have permission to: ' + action);
  }
}

function redirectToLogin (req, res) {
  req.session.redirect_to = process.env.HOST + req.path;
  res.redirect(process.env.NEXUS_URL);
}

const Role = {
  init: function (app) {
    app.use(role.middleware());

    role.use('access home', (req) => {
      if (!req.isAuthenticated()) return false;
      return true;
    })
  },
  reqAuth: (req, res, next) => {
    if(req.isAuthenticated()){
      next();
    } else {
      redirectToLogin(req, res);
    }
  },
  can: (verb) => {
    return role.can(verb)
  },
  // Define roles here
  isAdmin: (req) => {
    if (req.user.role === 'admin') return true;
    return false
  },
  isSuperAdmin: (req) => {
    if (req.user.role === 'superadmin') return true;
    return false
  }
};

module.exports = Role;