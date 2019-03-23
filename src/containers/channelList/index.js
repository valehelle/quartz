import React, { Component } from 'react';
import './channelList.css';
import { connect } from 'react-redux'
import * as channelActions from '../../redux/action/channelAction'
import * as pushActions from '../../redux/action/pushAction'
import * as listenerActions from '../../redux/action/listenerAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import {getSelectedProjectId, getAllProjectChannelIds, getChannelById, getSelectedChannelId, getProjectById } from '../../redux/reducer';
import ChannelItem from '../channeItem'

const uuidv4 = require('uuid/v4');



class ChannelList extends Component {
    constructor(props){
      super(props)
    }

    _renderChannelItem = (channelIds) => {
      const channelItems = channelIds.map(channelId => {
        return <ChannelItem key={channelId} channelId={channelId}/>
      })

      return channelItems
    }

    createChannel = () => {
      const channelId = uuidv4()
      const listenerId = uuidv4()
      const pushId = uuidv4()
      
      const params = {
        channelId,
        listenerId,
        pushId
      }
      this.props.createChannel(params)
    }

    onClickNew = () => {
      this.createChannel()
    }
    onClickRemove = () => {
      const params = {
        channelId: this.props.channel.id,
      }

      this.props.deleteChannel(params)
    }

    isDisabled = (channelIds) => {
      return channelIds.length > 0 ? false : true
    }


    render() {
      return (
        <div className = "row">
          <div className="col-md-12 ">
            <div className="channel-list">
            {this._renderChannelItem(this.props.channelIds)}
            </div>
          </div>
          <div className="col-md-12 new-remove">
            <button className="btn btn-primary  btn-sm col-md-2" type="button" onClick={this.onClickNew} disabled={!this.props.project}>
            <ion-icon name="add"></ion-icon>
            </button>
            <button className="btn btn-danger  btn-sm col-md-2 remove-btn" type="button" onClick={this.onClickRemove} disabled={this.isDisabled(this.props.channelIds)}>
            <ion-icon name="remove"></ion-icon>
            </button>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = (state) => {
    return {
      project: getProjectById(getSelectedProjectId(state), state),
      channel: getChannelById(getSelectedChannelId(state), state),
      channelIds: getAllProjectChannelIds(getSelectedProjectId(state), state)
    }
}

function mapDispatchToProps(dispatch) {
  return {
      createChannel: (params) => {
        dispatch(channelActions.createChannel(params));
      },
      deleteChannel: (params) => {
        dispatch(channelActions.deleteChannel(params));
      },
  };
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChannelList)

