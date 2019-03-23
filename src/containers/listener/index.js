import React, { Component } from 'react';
import './listener.css';
import { connect } from 'react-redux'
import * as listenerActions from '../../redux/action/listenerAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import ListenerList from '../listenerList'
import { getListenerById, getSelectedListenerId, getIsChannelJoined, getAllChannelListenerIds, getSelectedChannelId } from '../../redux/reducer';
const uuidv4 = require('uuid/v4');

class Listener extends Component {
    constructor(props){
      super(props)

  
    }

    onClickListen = () => {
      this.props.listenerIds.forEach(id => {
        const params = {
          listenerId: id,
        }
  
        this.props.listenEvent(params)
      });

    }


    handleEventNameChange = (event) => {
      const params = {
        eventName: event.target.value
      }
      this.props.updateListener(params)
    }


    render() {

      return (
            <div>
                <h4>Listener </h4>
                <ListenerList/>
                <div className="form-group topic-input">
                  <label>Event Name</label>
                  <input disabled={!this.props.listener} type="text" className="form-control"  value={this.props.listener ? this.props.listener.eventName : ''} onChange={this.handleEventNameChange} />
                </div>
                <button className="btn btn-success col-md-12" onClick={this.onClickListen} disabled={!this.props.isChannelJoined}>
                  Listen All
                </button>

            </div>
      );
    }
  }

const mapStateToProps = (state) => {
    return {
      listenerIds: getAllChannelListenerIds(getSelectedChannelId(state),state),
      listener: getListenerById(getSelectedListenerId(state), state),
      isChannelJoined: getIsChannelJoined(state),
    }
}
function mapDispatchToProps(dispatch) {
    return {
      listenEvent: (params) => {
        dispatch(webSocketActions.listenEvent(params));
      },
      updateListener: (params) => {
        dispatch(listenerActions.updateListener(params));
      }, 
    };
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Listener)

