'use strict';
const React = require('react');
const { connect } = require('react-redux');
const RetinaImage = require('react-retina-image');

const mapStateToProps = function(state){
  return {
  };
};

const mapDispatchToProps = function(dispatch){
  return {
  };
};

class ResourceGroupsSection extends React.PureComponent{

  render(){
    const resources = this.props.resources.map((resource) => {
      return (
        <div key={resource.get('id')} className="col-md-6 resource-panel-wrapper">
          <div className="resource-panel">
            <RetinaImage src="/assets/images/pdf.png" checkIfRetinaImgExists={true} className="pdf-icon"/>
            <a href={resource.get('signedUrl')} target="_blank">{resource.get('name')}</a>
          </div>
            
        </div>
      )
    });

    return(
      <div className="container-fluid resource-groups-section">
        <div className="row">
          <div className="col-md-12">
            <h2>{this.props.resourceGroup.get('name')}</h2>
            <div className="ruler"></div>
          </div>
        </div>
        <div className="row">
          {resources}
        </div>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(ResourceGroupsSection);