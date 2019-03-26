import { connect } from 'react-redux'
import React, { Component } from 'react';
import * as channelActions from '../../redux/action/channelAction'
import * as projecActions from '../../redux/action/projectAction'
import * as listenerActions from '../../redux/action/listenerAction'
import * as pushActions from '../../redux/action/pushAction'
import './content.css';
import  Push from '../push'
import  Listener from '../listener'
import  Terminal from '../terminal'

class Content extends Component {
    render() {
      return (
            <div  className="row">
              <div className="col-md-4 push-listener">
                <Listener/>
                <Push/>
              </div>
              <div className="col-md-8 terminal-line">
                <Terminal/>
              </div>
            </div>
      );
    }
  }
const mapStateToProps = (state) => {
    return {
      text: state.channel.text,
      text2: state.channel.noText
    }
}
function mapDispatchToProps(dispatch) {
    return {
      createProject: (params) => {
        dispatch(projecActions.createProject(params));
      },
      createChannel: (params) => {
        dispatch(channelActions.createChannel(params));
      },
      createListener: (params) => {
        dispatch(listenerActions.createListener(params));
      },
      createPush: (params) => {
        dispatch(pushActions.createPush(params));
      }
      
    };
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Content)