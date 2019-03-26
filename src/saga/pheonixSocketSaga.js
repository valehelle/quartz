import { call, put, take, takeLatest, cancelled, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import channelTypes from '../redux/type/channelType'
import listenerTypes from '../redux/type/listenerType'
import webSockets from '../redux/type/webSocketType'
import projectTypes from '../redux/type/projectType'
import { Socket } from '../lib/phoenix'
import * as terminalActions from '../redux/action/terminalAction'
import * as projectActions from '../redux/action/projectAction'
import * as listenerActions from '../redux/action/listenerAction'
import * as channelActions from '../redux/action/channelAction'
import * as webSocketActions from '../redux/action/webSocketAction'
import {getAllListener, getIsListenerIds, getListenerById} from '../redux/reducer'
const uuidv4 = require('uuid/v4');

let socket
let phxChannel


function initWebsocket(url, endpoint, params) {
    const param = {
        params: JSON.parse(params)
        
    }
    return eventChannel(emitter => {

        socket = new Socket(url, endpoint, param)
        socket.onError( (error) =>{
            const logId = uuidv4()
            const params = {
                name: 'CONNECTION_ERROR',
                payload: {
                    error
                },
                logId: logId
            }
            emitter(terminalActions.createLog(params))
        })
        socket.onOpen(function(){ 
            const logId = uuidv4()
            const params = {
                name: 'SOCKET_CONNECTED',
                payload: '',
                logId: logId
            }
            emitter(terminalActions.createLog(params))
            emitter(projectActions.projectConnected({}))
        })
        socket.onClose(function(){ 
            const logId = uuidv4()
            const params = {
                name: 'SOCKET_CLOSED',
                payload: '',
                logId: logId
            }
            emitter(terminalActions.createLog(params))
        })

        socket.connect()

      // unsubscribe function
      return () => {
        socket.disconnect()
        const logId = uuidv4()
        const params = {
            name: 'SOCKET_DISCONNECTED',
            payload: '',
            logId: logId
        }
        emitter(terminalActions.createLog(params))
      }
    })
  }

function* initiateSocket(action) {
    const {
        url,
        endpoint,
        parameters
    } = action.params

    const logId = uuidv4()
    const params = {
        name: 'CONNECTING',
        payload: '',
        logId: logId
    }
    yield put (terminalActions.createLog(params))

    try{
        const socketChannel = yield call(initWebsocket, url, endpoint, parameters)
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
    }catch(e){
        const logId = uuidv4()
        const params = {
            name: 'CONNECTION_ERROR',
            payload: {
                "description": "Please make sure your url is correct. If you are using Firefox and you are connecting to http server, you need to disable network.websocket.allowInsecureFromHTTPS in about:config"
            },
            logId: logId
        }
        yield put (terminalActions.createLog(params))
    }

    
}

function topicChannel(action){
    return eventChannel(emitter => {
        const topic = action.params.topic
        phxChannel = socket.channel(topic, {})
        phxChannel.join()
        .receive("ok", resp => {
            const logId = uuidv4()
            const params = {
                name: 'CHANNEL_JOINED',
                payload: resp,
                logId: logId
            }
            emitter(terminalActions.createLog(params))
            emitter(channelActions.channelJoined({}))
            })
        .receive("error", resp => { 
            const logId = uuidv4()
            const params = {
                name: 'FAIL_TO_JOIN_CHANNEL',
                payload: resp,
                logId: logId
            }
            emitter(terminalActions.createLog(params))
         })

        return () => {
        }
    })
}

function* joinChannel(action) {
    const createChannel = yield call(topicChannel, action)
    
    try{
        while (true) {
            const action = yield take(createChannel)
            yield put(action)
        }
    }finally {
        if (yield cancelled()) {
            createChannel.close()
        }    
      }
}

function createListener(allListener, state){
    return eventChannel(emitter => {
        for(const key in allListener) {
            const listenerId = allListener[key]
            const listener = getListenerById(listenerId, state)
            phxChannel.on(listener.eventName, (payload) => {
                console.log('listen for ' + listener.eventName)
                const logId = uuidv4()
                const params = {
                    name: listener.eventName,
                    payload: payload,
                    logId: logId
                }
                emitter(terminalActions.createLog(params))
            })
        }

        return () => {
            for(const key in allListener) {
                const listenerId = allListener[key]
                const listener = getListenerById(listenerId, state)
                console.log('off for ' + listener.eventName)
                phxChannel.off(listener.eventName)
            }
            console.log('close')
        }
    })
}
function* listenEvent() {
    const state = yield select();
    const allListener = getIsListenerIds(state)
    const phxEvent = yield call(createListener, allListener, state)
    try{
        while (true) {
            const action = yield take(phxEvent)
            yield put(action)
        }
    }finally {
        if (yield cancelled()) {
            phxEvent.close()
        }    
    }

}


function* unListenEvent(action) {
    
    const state = yield select();
    const listener = getListenerById(action.params.listenerId, state)
    const allListener = getIsListenerIds(state)
    for(const key in allListener) {
        const listenerId = allListener[key]
        const listener = getListenerById(listenerId, state)
        console.log('off for ' + listener.eventName)
        phxChannel.off(listener.eventName)
    }
    phxChannel.off(listener.eventName)

    yield put(webSocketActions.reListenEvent({}))

}
function* deleteListener(action) {
    const state = yield select();
    const allListener = getIsListenerIds(state)
    for(const key in allListener) {
        const listenerId = allListener[key]
        const listener = getListenerById(listenerId, state)
        phxChannel.off(listener.eventName)
    }
    const params = action.params
    yield put(listenerActions.removeListener(params)) 
}


function* sendPush(action) {
    const{
        eventName,
        body
    } = action.params
    phxChannel.push(eventName, JSON.parse(body))
}
function* resetProject(action) {
    yield put(projectActions.start({})) 
}

export const pheonixSocketSaga = [
    takeLatest(webSockets.CONNNECT_SOCKET, initiateSocket),
    takeLatest(webSockets.JOIN_CHANNEL, joinChannel),
    takeLatest(webSockets.LISTEN_EVENT, listenEvent),
    takeLatest(webSockets.RELISTEN_EVENT, listenEvent),
    takeLatest(listenerTypes.REMOVE_LISTENER, listenEvent),
    takeLatest(webSockets.UNLISTEN_EVENT, unListenEvent),
    takeLatest(listenerTypes.DELETE_LISTENER, deleteListener),
    takeLatest(webSockets.SEND_PUSH, sendPush),
    takeLatest(projectTypes.IMPORT_REDUX, resetProject),

]

export default pheonixSocketSaga;