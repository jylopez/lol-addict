'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { Link } = require('react-router');
const { NavDropdown,MenuItem } = require('react-bootstrap');
const RetinaImage = require('react-retina-image');

const mapStateToProps = function(state){
  return {
    locale: state.i18n.locale,
    user: state.user
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    updateLocale: function(newLocale){
      dispatch({type: 'i18n.update_locale', locale: newLocale});
    },
    flash: function(opts){
      dispatch({type: 'flash.push', flash: opts});
    }
  };
};

class Navbar extends React.PureComponent{
  render(){
    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <RetinaImage src="/assets/images/logo.png" checkIfRetinaImgExists={true}/>
            </Link>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="/">Videos</Link></li>
            <li><Link to="/resources">Resources</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a onClick={this.logout}>Logout</a></li>
          </ul>
        </div>
      </nav>
    );
  }

  logout(){
    const form = document.createElement('form');
    form.setAttribute('method','POST');
    form.setAttribute('action','/logout');
      document.body.appendChild(form);
    form.submit();
  }

  flash = () => {
    this.props.flash({
      type: ['error','info','success'][Math.floor(Math.random() * 3)],
      keyPath: ['forgot_your_password','welcome.p1','welcome.the_feedback_report_will_be_available'][Math.floor(Math.random() * 3)],
      // can also pass values and or unescaped, anything that can be passed to I18nMsg
    });
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Navbar);