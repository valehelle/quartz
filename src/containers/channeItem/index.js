import React, { Component } from 'react';
import './channelItem.css';
import { connect } from 'react-redux'
import * as channelActions from '../../redux/action/channelAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import { getProjectById, getChannelById, getSelectedChannelId, getAllChannelListenerIds, getIsListenerIds} from '../../redux/reducer';

class ChannelItem extends Component {

  channelClick = () => {
    const channelId = this.props.channel.id
    const listenerIds = this.props.channel.listenerIds
    const pushIds = this.props.channel.pushIds
    const params = {
      channelId,
      pushIds,
      listenerIds
    }
    this.props.isListeningIds.forEach(id => {
      const params = {
        listenerId: id,
      }
      this.props.unListenEvent(params)
    })
    

    this.props.changeChannel(params)
  }

    render() {
      if(this.props.selectedChannelId === this.props.channel.id){
        return (
          <div className="on-hover-pointer center-text on-hover-lightgrey selected-channel" onClick={this.channelClick}>
            {this.props.channel.topic}
          </div>
        )
      }else{
        return (
          <div className="on-hover-pointer center-text on-hover-lightgrey" onClick={this.channelClick}>
            {this.props.channel.topic}
          </div>
        )
      }
    }
  }

const mapStateToProps = (state, ownProps) => {
    return {
      selectedChannelId: getSelectedChannelId(state),
      isListeningIds: getIsListenerIds(state),
      channel: getChannelById(ownProps.channelId, state),
    }
}
  
function mapDispatchToProps(dispatch) {
  return {
      changeChannel: (params) => {
        dispatch(channelActions.changeChannel(params));
      },
      unListenEvent: (params) => {
        dispatch(webSocketActions.unListenEvent(params));
      },
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChannelItem)

