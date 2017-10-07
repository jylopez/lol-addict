'use strict';
const React = require('react');

const I18nMsg = require('./i18n_msg');

class FlashMessage extends React.PureComponent {
  render(){
    const options = this.props.options.toJSON();
    const {type,dismiss,...rest} = options;
    return (
      <div className={`alert alert-${type}`}>
        {React.createElement(I18nMsg,rest)}
        <button className="close" onClick={this.onClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }

  onClose = () => {
    this.props.dismiss(this.props.options.get('keyPath'))
  }
}

module.exports = FlashMessage;