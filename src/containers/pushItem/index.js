import React, { Component } from 'react';
import './pushItem.css';
import { connect } from 'react-redux'
import * as pushActions from '../../redux/action/pushAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import { getPushById, getSelectedPushId} from '../../redux/reducer';

class PushItem extends Component {

    pushClick = () => {
      const params = {
        pushId: this.props.push.id
      }
      this.props.changePush(params)
    }
    render() {
      if (this.props.selectedPushId === this.props.push.id){
        return(
          <div className="on-hover-pointer center-text on-hover-lightgrey selected" onClick={this.pushClick}>
            {this.props.push.eventName}
          </div>
        )
      }else{
        return(
          <div className="on-hover-pointer center-text on-hover-lightgrey" onClick={this.pushClick}>
            {this.props.push.eventName}
          </div>
      )
      }

    }
  }

const mapStateToProps = (state, ownProps) => {
    return {
      selectedPushId: getSelectedPushId(state),
      push: getPushById(ownProps.pushId, state),
    }
}
  
function mapDispatchToProps(dispatch) {
  return {
      changePush: (params) => {
        dispatch(pushActions.changePush(params));
      },
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PushItem)

