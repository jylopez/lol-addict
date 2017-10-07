'use strict';
const React = require('react');
const { connect } = require('react-redux');

const FlashMessage = require('./flash_message');

const mapStateToProps = function(state){
  return {
    flash: state.flash
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    dismiss: function(keyPath){
      return dispatch({type: 'flash.dismiss', keyPath: keyPath});
    }
  };
};


class Flash extends React.PureComponent {
  render(){
    return (
      <div className="flash">
        <div className="container">
          {this.props.flash.map(f => {
            return React.createElement(FlashMessage,{
              options: f, 
              key: f.get('keyPath'), 
              dismiss: this.props.dismiss
            });
          })}
        </div>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Flash);