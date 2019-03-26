import React, { Component } from 'react';
import './channel.css';
import { connect } from 'react-redux'
import * as channelActions from '../../redux/action/channelAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import { getAllChannelIds, getChannelById, getSelectedChannelId, getIsProjectConnected } from '../../redux/reducer';
import ChannelList from '../channelList'


class Channel extends Component {
    constructor(props){
      super(props)

    }
    componentDidMount(){
    }

   
    onClickJoin = () => {
      const {
        topic,
      } = this.props.channel
      
      const params = {
        topic
      }

      this.props.joinChannel(params)
    }
    handleTopicChange = (event) => {
      const params = {
        topic: event.target.value
      }
      this.props.updateChannel(params)
    }

    render() {
      return (
            <div>
              <h4>Channel</h4>
                <ChannelList/>
                <div className="form-group topic-input">
                  <label>Topic</label>
                  <input disabled={!this.props.channel}type="text" className="form-control"  value={this.props.channel ? this.props.channel.topic : ''} onChange={this.handleTopicChange} />
                </div>
                <button className="btn btn-success col-md-12" onClick={this.onClickJoin} disabled={!(this.props.isProjectConnected && this.props.channel)}>
                  Join
                </button>
            </div>
      );
    }
  }

const mapStateToProps = (state) => {
    return {
      channel: getChannelById(getSelectedChannelId(state), state),
      isProjectConnected: getIsProjectConnected(state)
    }
}
function mapDispatchToProps(dispatch) {
    return {
      joinChannel: (params) => {
        dispatch(webSocketActions.joinChannel(params));
      },
      updateChannel: (params) => {
        dispatch(channelActions.updateChannel(params))
      },
    };
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Channel)

