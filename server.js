'use strict';

// env
require('dotenv').load();

// promises
const Promise = require('bluebird');

// babel, to transpile mainly jsx but any non node features
// for isomorphic rendering
require('babel-register')({
  only: /components\//
});

// app
const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 7000));

// favicon
var favicon = require('serve-favicon');
var path = require('path')
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

// static
app.use('/assets',express.static('public'));

// views
app.set('views', './src/html');
app.set('view engine', 'pug');

// body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// override methods from forms
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// sessions
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const sessionOptions = {
  name: 'nexus',
  store: new RedisStore({ url: process.env.SESSION_STORE_URL, prefix: 'nexus:' }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {}
}
if (app.get('env') === 'production') {
  app.set('trust proxy', true);
  sessionOptions.cookie.secure = true;
  sessionOptions.cookie.domain = '.innovatorsdna.com';
  sessionOptions.proxy = true;
}
app.use(session(sessionOptions));

// flash
const flash = require('connect-flash');
app.use(flash());
app.use(function(req,res,next){
  res.locals.flash = {
    error: req.flash('error'),
    info: req.flash('info'),
    success: req.flash('success'),
  };
  next();
});

// i18n
const i18n = require('i18n');
i18n.configure({
  defaultLocale: 'en',
  cookie: 'i18nsettings',
  directory: './locales',
  objectNotation: true,
  updateFiles: false,
});
app.use(i18n.init);

// ip
const requestIp = require('request-ip');
app.use(requestIp.mw());

// routes
const Routes = require('./src/js/server/routes');
Routes.init(app);

// error handler
const Errors = require('./src/js/server/errors');
Errors.init(app);

app.listen(app.get('port'), process.env.PRIVATE_IP, function(){
  console.log('Server up on',app.get('port'),'in',process.env.NODE_ENV);
});
