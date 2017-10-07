'use strict';
const React = require('react');
const { connect } = require('react-redux');
const ResourcesActions = require('../actions/resources_actions');
const { dispatchMerge } = require('../helpers/dispatch_helpers');
const ResourceGroupsSection = require('./resource_groups_section');

const mapStateToProps = function(state){
  return {
    resources: state.resources,
    resourceGroups: state.resourceGroups
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    updateResources: dispatchMerge(dispatch, 'resources'),
    updateResourceGroups: dispatchMerge(dispatch, 'resourceGroups')
  };
};

class ResourcesIndex extends React.PureComponent{
  parseResourceGroups(resources){
    var resourceGroups = {}
    var resourceGroupsArray = []
    for (var i = 0; i < resources.length; i++) {
      resourceGroups[resources[i].resource_group_id] = {
        id: resources[i].resource_group_id,
        name: resources[i].resource_group_name,
        position: resources[i].resource_group_position
      }
    }
    for (var i = 0; i < Object.keys(resourceGroups).length; i++) {
      resourceGroupsArray.push(resourceGroups[Object.keys(resourceGroups)[i]])
    }
    return resourceGroupsArray
  }

  componentWillMount(){
    ResourcesActions.index().then(resources => {
      this.props.updateResources(resources)
      this.props.updateResourceGroups(this.parseResourceGroups(resources))
    })
  }

  render(){
    const getResourcesByGroup = (resourceGroup) => {
      return this.props.resources.filter((resource) => {
        return resource.get('resource_group_id') === resourceGroup.get('id')
      })
    }

    const resourceGroups = this.props.resourceGroups.map((resourceGroup) => {
      return (
        <ResourceGroupsSection key={resourceGroup.get('id')} resources={getResourcesByGroup(resourceGroup)} resourceGroup={resourceGroup}/>
      )
    })

    return(
      <div>
        {resourceGroups}
      </div>
    );
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(ResourcesIndex);