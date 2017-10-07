'use strict';
const React = require('react');

const AppLayout = function(props){
  return (
    <div className="app-layout">
      <div className="container">
        {props.children}
      </div>
    </div>
  );
};

module.exports = AppLayout;