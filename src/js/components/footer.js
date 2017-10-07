'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { Link } = require('react-router');
const RetinaImage = require('react-retina-image');

const mapStateToProps = function(state){
  return {
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    
  };
};

class Footer extends React.PureComponent{
  render(){
    return(
      <nav className="navbar navbar-default footer">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <RetinaImage src="/assets/images/logo.png" checkIfRetinaImgExists={true}/>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Footer);