'use strict';
const React = require('react');
const { Field } = require('redux-form');

class FormGroup extends React.PureComponent {
  render(){
    
    const fieldTag = (name, component='input', type='text', options=null) => {
      // component can be 'input' || 'select' || 'textarea'
      var isSelectComponent = (component ==='select') && options;
      var isCheckbox = type === 'checkbox'
      var optionTags = () => {
        return options.map(obj => {
          return <option value={obj.value} key={obj.value}>{obj.name || obj.value}</option>
        })
      }
      var fieldChildren = () => {
        if (isSelectComponent) return optionTags();
      }

      return (
        <Field name={name} className={isCheckbox ? 'checkbox' : 'form-control'} component={component} type={type}>
          {fieldChildren()}
        </Field>
      )
    }

    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        {fieldTag(this.props.name, this.props.component, this.props.type, this.props.options)}
      </div>
    );
  }
}

module.exports = FormGroup