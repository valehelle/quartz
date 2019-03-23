import React, { Component } from 'react';
import './log.css';
import { connect } from 'react-redux'
import * as pushActions from '../../redux/action/pushAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import { getLogById } from '../../redux/reducer'
import ReactJson from 'react-json-view'


class LogData extends Component {
    constructor(props){
      super(props)
    }

    render() {
      return (
                <div>
                  <ReactJson src={this.props.log.payload} name={this.props.log.name} collapsed={2} displayDataTypes={false}/>
             
                </div>
      )
    }
  }

const mapStateToProps = (state, ownProps) => {
    return {
      log: getLogById(ownProps.id, state)
    }
}
export default connect(
    mapStateToProps
  )(LogData)

