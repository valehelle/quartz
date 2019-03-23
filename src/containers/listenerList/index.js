import React, { Component } from 'react';
import './listenerList.css';
import { connect } from 'react-redux'
import * as listenerActions from '../../redux/action/listenerAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import { getAllChannelListenerIds, getSelectedChannelId, getListenerById, getSelectedListenerId, getChannelById } from '../../redux/reducer';
import ListenerItem from '../listenerItem'

const uuidv4 = require('uuid/v4');



class ListenerList extends Component {
    constructor(props){
      super(props)
    }

    _renderListenerItem = (listenerIds) => {
      const listenerItem = listenerIds.map(listenerId => {
        return <ListenerItem key={listenerId} listenerId={listenerId}/>
      })

      return listenerItem
    }


    createListener = () => {
      const listenerId = uuidv4()
      const params = {
        listenerId
      }
      this.props.createListener(params)
    }
    onClickNew = () => {
      this.createListener()
    }
    // onClickRemove = () => {
    //   const {
    //     eventName,
    //   } = this.state
    //   const params = {
    //     eventName,
    //   }

    //   this.props.removeListener(params)
    // }

    onClickRemove = () => {
      const params = {
        listenerId: this.props.listener.id
      }
      this.props.removeListener(params)
    }

    isDisabled = (listenerIds) => {
      return listenerIds.length > 0 ? false : true
    }


    render() {
      return (
        <div className = "row">
          <div className="col-md-12 ">
            <div className="listener-list">
            {this._renderListenerItem(this.props.listenerIds)}
            </div>
          </div>
          <div className="col-md-12 new-remove">
            <button className="btn btn-primary  btn-sm col-md-1" type="button" onClick={this.onClickNew} disabled={!this.props.channel}>
            <ion-icon name="add"></ion-icon>
            </button>
            <button className="btn btn-danger  btn-sm col-md-1 remove-btn" type="button" onClick={this.onClickRemove} disabled={this.isDisabled(this.props.listenerIds)}>
            <ion-icon name="remove"></ion-icon>
            </button>
          </div>
        </div>
        
      );
    }
  }

const mapStateToProps = (state) => {
    return {
      channel: getChannelById(getSelectedChannelId(state), state),
      listener: getListenerById(getSelectedListenerId(state), state),
      listenerIds: getAllChannelListenerIds(getSelectedChannelId(state), state)
    }
}

function mapDispatchToProps(dispatch) {
  return {
    createListener: (params) => {
      dispatch(listenerActions.createListener(params));
    },
    removeListener: (params) => {
      dispatch(listenerActions.deleteListener(params));
    },
  };
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ListenerList)

