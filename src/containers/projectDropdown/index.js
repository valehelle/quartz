import React, { Component } from 'react';
import './projectDropdown.css';
import { connect } from 'react-redux'
import * as projecActions from '../../redux/action/projectAction'
import * as channelActions from '../../redux/action/channelAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import { getProjectById, getSelectedProjectId, getAllProjectIds } from '../../redux/reducer';
import ProjectDropdownItem from '../projectDropdownItem'
const uuidv4 = require('uuid/v4');

class ProjectDropdown extends Component {
    constructor(props){
      super(props)
    }

    _renderDropDownItem = (projectIds) => {
      const dropDownItems = projectIds.map(projectId => {
        return <ProjectDropdownItem key={projectId} projectId={projectId}/>
      })

      return dropDownItems
    }
    createProjectClick = () => {
      const projectId = uuidv4()
      const channelId = uuidv4()
      const listenerId = uuidv4()
      const pushId = uuidv4()
      
      const params = {
        projectId,
        channelId,
        listenerId,
        pushId
      }
      this.props.createProject(params)
    }
    removeProjectClick = () => {
      const {
        channelIds,
        id
      } = this.props.project
      
      channelIds.forEach(id => {
        const params = {
          channelId: id
        }
        this.props.deleteChannel(params)
      });

      const params = {
        projectId: id
      }
      this.props.removeProject(params)

    }

    isDisabled = (projectIds) => {
      return projectIds.length > 0 ? false : true
    }

    render() {
      return (
        <div className = "row">
          <div className="dropdown col-md-12">
            <button className="btn btn-primary  btn-sm col-md-12 btn-color" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.props.project ? this.props.project.url  : ''}
            </button>
            <div className="dropdown-menu" >
              {this._renderDropDownItem(this.props.projectIds)}
            </div>
          </div>
          <div className="col-md-12 new-remove">
            <button className="btn btn-primary  btn-sm col-md-2" type="button" onClick={this.createProjectClick}>
            <ion-icon name="add"></ion-icon>
            </button>
            <button className="btn btn-danger  btn-sm col-md-2 remove-btn" type="button" onClick={this.removeProjectClick} disabled={this.isDisabled(this.props.projectIds)}>
            <ion-icon name="remove"></ion-icon>
            </button>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = (state) => {
    return {
      projectIds: getAllProjectIds(state),
      project: getProjectById(getSelectedProjectId(state), state)
    }
}

function mapDispatchToProps(dispatch) {
  return {
    createProject: (params) => {
      dispatch(projecActions.createProject(params));
    },
    removeProject: (params) => {
      dispatch(projecActions.removeProject(params));
    },
    deleteChannel: (params) => {
      dispatch(channelActions.deleteChannel(params));
    },
  };
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProjectDropdown)

