import webSocketType from '../type/webSocketType'

export const connectSocket = params => ({
    type: webSocketType.CONNNECT_SOCKET,
    params
})
export const joinChannel = params => ({
    type: webSocketType.JOIN_CHANNEL,
    params
})
export const sendPush = params => ({
    type: webSocketType.SEND_PUSH,
    params
})
export const listenEvent = params => ({
    type: webSocketType.LISTEN_EVENT,
    params
})
export const reListenEvent = params => ({
    type: webSocketType.RELISTEN_EVENT,
    params
})
export const unListenEvent = params => ({
    type: webSocketType.UNLISTEN_EVENT,
    params
})
export const removeListener = params => ({
    type: webSocketType.REMOVE_LISTENER,
    params
})
