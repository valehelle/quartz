import React, { Component } from 'react';
import './push.css';
import { connect } from 'react-redux'
import * as pushActions from '../../redux/action/pushAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import PushList from '../pushList'
import { getPushById, getSelectedPushId, getIsChannelJoined } from '../../redux/reducer';
import { isJson } from '../../lib/functions';

const uuidv4 = require('uuid/v4');

class Push extends Component {
    constructor(props){
      super(props)

      this.state = {
        event: 'user:chat',
        body: '{"message":"heloooo"}'
      }
    }
    componentDidMount(){
    }


    onClickSend = () => {
      const {
        eventName,
        body
      } = this.props.push

      if(isJson(body)){
        const params = {
          eventName,
          body
        }
        this.props.sendPush(params)
      }else{
        alert("Body must be in JSON format")
      }
      
    }
    handleChange = (event) => {
      const params = {
        ...this.props.push,
        [event.target.name]: event.target.value
      }
      this.props.updatePush(params)
    }
    handleBodyChange = (event) => {
      this.setState({
        body: event.target.value
      })
    }


    render() {
      return (
            <div className="push-container">
              <h4>Push</h4>
              <PushList/>
                <div className="form-group topic-input">
                  <label>Event Name</label>
                  <input disabled={!this.props.push}  name="eventName" type="text" className="form-control"  value={this.props.push ? this.props.push.eventName  : ''} onChange={this.handleChange} />
                </div>
                <div className="form-group topic-input">
                  <label>Body</label>
                  <textarea disabled={!this.props.push} name="body" rows="4" cols="50" type="text" className="form-control"  value={this.props.push ? this.props.push.body  : ''} onChange={this.handleChange} />
                </div>

                <button className="btn btn-success col-md-12 send-btn" onClick={this.onClickSend} disabled={!this.props.isChannelJoined}>
                  Send
                </button>
            </div>
      );
    }
  }

const mapStateToProps = (state) => {
    return {
      push: getPushById(getSelectedPushId(state), state),
      isChannelJoined: getIsChannelJoined(state)
    }
}
function mapDispatchToProps(dispatch) {
    return {
      sendPush: (params) => {
        dispatch(webSocketActions.sendPush(params));
      },
      updatePush: (params) => {
        dispatch(pushActions.updatePush(params));
      },
    };
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Push)

