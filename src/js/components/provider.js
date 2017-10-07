'use const';
const React = require('react');
const ReactRedux = require('react-redux');

const Provider = function(props){
  return (
    <ReactRedux.Provider store={props.store}>
      {props.children}
    </ReactRedux.Provider>
  );
};

module.exports = Provider;