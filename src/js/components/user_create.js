'use strict';
const React = require('react');
const { connect } = require('react-redux');

const mapStateToProps = function(state){
  return {
  };
};

const mapDispatchToProps = function(dispatch){
  return {
  };
};

class UserCreate extends React.PureComponent{

  render(){
    return(
      <div className="user-create">
        <h1>User create! (test deploy)</h1>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(UserCreate);