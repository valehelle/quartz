import React, { Component } from 'react';
import './project.css';
import { connect } from 'react-redux'
import * as projectActions from '../../redux/action/projectAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import * as terminalActions from '../../redux/action/terminalAction'
import ProjectDropdown from '../projectDropdown'
import { getSelectedProjectId, getProjectById } from '../../redux/reducer';
import { isJson } from '../../lib/functions';
const uuidv4 = require('uuid/v4');

class Project extends Component {
    constructor(props){
      super(props)

    }
    componentDidMount(){
      if(!this.props.project){
        this.createProject()
      }
      this.props.clearTerminal({})
     
    }

    createProject = () => {
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

    onClickConnect = () => {
      const {
        url,
        endpoint,
      } = this.props.project

      const params = {
        url,
        endpoint,
        parameters: this.props.project.parameters,
      }
      this.props.clearTerminal({})
      if(isJson(this.props.project.parameters)){
        this.props.connectSocket(params)
      }else{
        alert("Parameters must be in JSON format")
      }
    }
    onClickNew = () => {
      this.createProject()
    }
    handleChange = (event) => {
      const key = event.target.name
      const params = {
        ...this.props.project,
        [key]: event.target.value,
      }
      this.props.updateProject(params)
    }


    render() {
      return (
            <div className="project">
              <ProjectDropdown/>
                <div className="form-group project-input">
                  <label>URL</label>
                  <input name="url" type="text" className="form-control"  value={this.props.project ? this.props.project.url : ''} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label>Endpoint</label>
                  <input name="endpoint" type="text" className="form-control"  value={this.props.project ? this.props.project.endpoint : ''} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label>Parameters</label>
                  <textarea name="parameters" rows="2" cols="50"  className="form-control"  value={this.props.project ? this.props.project.parameters : ''}onChange={this.handleChange} />
                </div>
                <button className="btn btn-success col-md-12" onClick={this.onClickConnect}>
                  Connect
                </button>

            </div>
      );
    }
  }

const mapStateToProps = (state) => {
    return {
      project: getProjectById(getSelectedProjectId(state), state)
    }
}
function mapDispatchToProps(dispatch) {
    return {
      createProject: (params) => {
        dispatch(projectActions.createProject(params));
      },
      connectSocket: (params) => {
        dispatch(webSocketActions.connectSocket(params));
      },
      updateProject: (params) => {
        dispatch(projectActions.updateProject(params))
      },
      clearTerminal: (params) => {
        dispatch(terminalActions.clearTerminal(params))
      }
    };
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Project)

