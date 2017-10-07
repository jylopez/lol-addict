'use strict';
const React = require('react');

const Navbar = require('./navbar');
const Flash = require('./flash');
const Footer = require('./footer');

const AppLayout = function(props){
  return (
    <div className="app-layout">
      <Navbar />
      <Flash />
      <div className="container">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

module.exports = AppLayout;