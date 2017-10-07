'use strict';
const React = require('react');
const { connect } = require('react-redux');
const toReact = require('html-to-react').Parser;

const I18nHelpers = require('../helpers/i18n_helpers');

const mapPropsToState = function(state,ownProps){
  return {
    message: I18nHelpers.t(ownProps.keyPath,ownProps.values,state.i18n.messages,state.i18n.defaultMessages),
  };
};

class I18nMsg extends React.PureComponent {
  render(){
    let {message,keyPath,values,unescaped,...props} = this.props;
    if(unescaped){ message = new toReact().parse(`<span>${message}</span>`); }
    return(
      <span {...props}>{message}</span>
    );
  }
}

I18nMsg.propTypes = {
  keyPath: React.PropTypes.string.isRequired,
  values: React.PropTypes.object,
  unescaped: React.PropTypes.bool,
};

module.exports = connect(mapPropsToState,{})(I18nMsg);