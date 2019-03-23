import React, { Component } from 'react';
import './terminal.css';
import { connect } from 'react-redux'
import * as pushActions from '../../redux/action/pushAction'
import * as webSocketActions from '../../redux/action/webSocketAction'
import { getAllLogIds } from '../../redux/reducer'
import LogData from '../log'
import Header from '../header'

class Terminal extends Component {
    constructor(props){
      super(props)
      this.state = {
        isBottom: false
      }
    }
    messagesEnd = React.createRef()

    componentDidMount(){
    }

    componentDidUpdate () {
      if (this.state.isBottom){
        this.scrollToBottom()
      }
      
    }

    scrollToBottom = () => {
      this.messagesEnd.current.scrollIntoView({ behavior: 'auto' })
    }

    _renderLog = (ids) => {
      const log = ids.map(id => {
        return <LogData key={id} id={id}/>
      })
      return log
    }
    handleScroll = (e) => {
      const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 10 ;
      if (bottom) {
        this.setState({
          isBottom: true
        })
      }else{
        this.setState({
          isBottom: false
        })
      }
    }

    render() {
      return (
            <div>
            <Header/>
            <div className = "terminal">
                <h4>Terminal</h4>
                <div className="terminal-log" onScroll={this.handleScroll}>
                  {this._renderLog(this.props.logIds)}
                  <div ref={this.messagesEnd} />
                </div>
            </div>
            </div>
      );
    }
  }

const mapStateToProps = (state) => {
    return {
      logIds: getAllLogIds(state)
    }
}
function mapDispatchToProps(dispatch) {
    return {

    }
}
  
export default connect(
    mapStateToProps
  )(Terminal)

