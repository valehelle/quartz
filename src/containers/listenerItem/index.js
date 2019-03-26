import React, { Component } from 'react';
import './listenerItem.css';
import { connect } from 'react-redux'
import * as listenerActions from '../../redux/action/listenerAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import { getProjectById, getChannelById, getSelectedChannelId, getListenerById, getSelectedListenerId, getIsListening, getIsChannelJoined} from '../../redux/reducer';

class ListenerItem extends Component {

    listenerClick = () => {
      const listenerId = this.props.listener.id
      const params = {
        listenerId
      }
     this.props.changeListener(params)
    }
    playPauseClick = (e) => {
      e.stopPropagation();
        if(this.props.isListening){
          const {
            id,
          } = this.props.listener
          const params = {
            listenerId: id,
          }
          this.props.unListenEvent(params)
        }else{
          const {
            id,
          } = this.props.listener
          const params = {
            listenerId: id,
          }
          this.props.listenEvent(params)
        }
      

    }
    render()
    {
      if(this.props.selectedListenerId === this.props.listener.id){
        return(
          <div className="container" onClick={this.listenerClick}>
           <div className="row listener-item on-hover-pointer on-hover-lightgrey selected-listener ">
             <div className="col-md-8">
              {this.props.listener.eventName}
             </div>
             <div className="col-md-4" onClick={this.playPauseClick}>
             <button className="btn btn-primary btn-sm col-md-8 play-pause" type="button" disabled={!this.props.isChannelJoined}>{this.props.isListening ? <ion-icon name="pause"></ion-icon> : <ion-icon name="play"></ion-icon>}</button>
             </div>
           </div>
          </div>
        )
      }else{
        return(
          <div className="container" onClick={this.listenerClick}>
           <div className="row listener-item on-hover-pointer on-hover-lightgrey ">
             <div className="col-md-10 ">
              
              {this.props.listener.eventName}
              
             </div>
             <div className="col-md-2" onClick={this.playPauseClick}>
             <button className="btn btn-primary  btn-sm col-md-12" type="button" disabled={!this.props.isChannelJoined} > {this.props.isListening ? <ion-icon name="pause"></ion-icon> : <ion-icon name="play"></ion-icon>}</button>
             </div>
           </div>
          </div>
        )
      }

    }
  }

const mapStateToProps = (state, ownProps) => {
    return {
      selectedListenerId: getSelectedListenerId(state),
      isListening: getIsListening(ownProps.listenerId, state),
      listener: getListenerById(ownProps.listenerId, state),
      isChannelJoined: getIsChannelJoined(state),
    }
}

function mapDispatchToProps(dispatch) {
  return {
      changeListener: (params) => {
        dispatch(listenerActions.changeListener(params));
      },
      listenEvent: (params) => {
        dispatch(webSocketActions.listenEvent(params))
      },
      unListenEvent: (params) => {
        dispatch(webSocketActions.unListenEvent(params))
      }
  };
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListenerItem)

