import React, { Component } from 'react';
import './projectDropdown.css';
import { connect } from 'react-redux'
import * as projecActions from '../../redux/action/projectAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import { getProjectById} from '../../redux/reducer';

class ProjectDropdownItem extends Component {

    itemClick = () => {
      const params = {
        projectId: this.props.project.id,
        channelIds: this.props.project.channelIds
      }
      this.props.changeProject(params)
    }
    render() {
      return (
        <div className="dropdown-item" onClick={this.itemClick}>
          {this.props.project.url}
        </div>
      )
    }
  }


  function mapDispatchToProps(dispatch) {
    return {
      changeProject: (params) => {
        dispatch(projecActions.changeProject(params));
      },
    };
  }

const mapStateToProps = (state, ownProps) => {
    return {
      project: getProjectById(ownProps.projectId, state),
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProjectDropdownItem)

