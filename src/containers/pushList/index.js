import React, { Component } from 'react';
import './pushList.css';
import { connect } from 'react-redux'
import * as pushActions from '../../redux/action/pushAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import { getSelectedChannelId, getAllChannelPushIds, getPushById, getSelectedPushId, getChannelById } from '../../redux/reducer';
import PushItem from '../pushItem'

const uuidv4 = require('uuid/v4');



class PushList extends Component {
    constructor(props){
      super(props)
    }

    _renderPushItem = (pushIds) => {
      const pushItems = pushIds.map(pushId => {
        return <PushItem key={pushId} pushId={pushId}/>
      })

      return pushItems
    }


    createPush = () => {
      const pushId = uuidv4()
      const params = {
        pushId
      }
      this.props.createPush(params)
    }
    onClickNew = () => {
      this.createPush()
    }

    onClickRemove = () => {

      const params = {
        pushId: this.props.push.id,
      }

      this.props.removePush(params)
    }

    isDisabled = (pushIds) => {
      return pushIds.length > 0 ? false : true
    }


    render() {
      return (
        <div className = "row">
          <div className="col-md-12 ">
            <div className="push-list">
            {this._renderPushItem(this.props.pushIds)}
            </div>
          </div>
          <div className="col-md-12 new-remove">
            <button className="btn btn-primary  btn-sm col-md-2" type="button" onClick={this.onClickNew} disable={!this.props.channel}>
            <ion-icon name="add"></ion-icon>
            </button>
            <button className="btn btn-danger  btn-sm col-md-2 remove-btn" type="button" onClick={this.onClickRemove} disabled={this.isDisabled(this.props.pushIds)}>
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
      push: getPushById(getSelectedPushId(state), state),
      pushIds: getAllChannelPushIds(getSelectedChannelId(state), state)
    }
}

function mapDispatchToProps(dispatch) {
  return {
    createPush: (params) => {
      dispatch(pushActions.createPush(params));
    },
    removePush: (params) => {
      dispatch(pushActions.removePush(params))
    }
  };
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PushList)

