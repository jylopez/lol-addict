'use strict';
const Passport = require('passport');
const LocalStrategy = require('passport-local');

const strategyOptions = {
  passReqToCallback: true
};

const loginOptions = {
  failureRedirect: '/',
  failureFlash: true
};

const Auth = {
  init: function(app){
    Passport.serializeUser(function(user, done) {
      done(null, {id: user.id, email: user.email, role: user.role});
    });

    Passport.deserializeUser(function(sessionUser, done) {
      done(null, sessionUser)
    });

    app.use(Passport.initialize());
    app.use(Passport.session());

  },
  logoutHandler: function(){
    return function(req,res){
      req.logout(); // passport method
      res.redirect(process.env.NEXUS_URL);
    };
  },
};

module.exports = Auth;