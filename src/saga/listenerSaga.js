import { call, put, take, takeLatest, cancelled } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import channelTypes from '../redux/type/channelType'
import { Socket } from "../lib/phoenix"
import * as channelActions from '../redux/action/channelAction'

let socket
let phxChannel
function initWebsocket(url, endpoint, params) {

    return eventChannel(emitter => {
        socket = new Socket(url, endpoint, params)
        socket.onError(function(error){ alert("An error occurred") })
        socket.onOpen(function(){ 
            console.info("the socket was opened"); 
        })
        socket.onClose(function(){ 
            console.info("the socket was closed"); 
        })
        socket.connect()
        
        
      // unsubscribe function
      return () => {
        socket.disconnect()
        console.log('Socket off')
      }
    })
  }


function* addTodo(action) {
    console.log(action)
 }

function* initiateSocket(action) {
    const {
        url,
        endpoint,
        params
    } = action
    const socketChannel = yield call(initWebsocket, url, endpoint, params)
    try{
        while (true) {
            const action = yield take(socketChannel)
            yield put(action)
        }
    }finally {
        if (yield cancelled()) {
            socketChannel.close()
        }    
      }
    
}
function* joinChannel() {
    phxChannel = socket.channel("game_session:lobby", {})
    phxChannel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })
}

function* listenEvent() {
    phxChannel.on("user:chat", payload => {
        console.log(payload)
      })
}
function* removeListener() {
    phxChannel.off("user:chat")
}

export const listenerSaga = [
    takeLatest(channelTypes.INITIATE_WEB_SOCKET, initiateSocket),
    takeLatest(channelTypes.CHANGE_TEXT, joinChannel),
    takeLatest(channelTypes.LISTEN_EVENT, listenEvent),
    takeLatest(channelTypes.REMOVE_EVENT_LISTENER, removeListener)
]

export default listenerSaga;