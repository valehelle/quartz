import { combineReducers } from 'redux'
import channel, * as channelReducer from './channelReducer'
import project, * as projectReducer from './projectReducer'
import push, * as pushReducer from './pushReducer'
import terminal, * as terminalReducer from './terminalReducer'
import listener, * as listenerReducer from './listenerReducer'

export default combineReducers({
    project,
    channel,
    push,
    listener,
    terminal,
})


//SELECTOR
export const getAllChannelIds = (state) => {
    return channelReducer.getAllIds(state.channel)
}
export const getChannelById = (id, state) => {
    return channelReducer.getById(id, state.channel)
}
export const getSelectedChannelId = (state) => {
    return channelReducer.getSelectedId(state.channel)
}

export const getAllChannelListenerIds = (id, state) => {
    if(id){
        return channelReducer.getAllListenerIds(id, state.channel)
    }else{
        return []
    }
}
export const getAllChannelPushIds = (id, state) => {
    if(id){
        return channelReducer.getAllPushIds(id, state.channel)
    }else{
        return []
    }
}
export const getIsChannelJoined = (state) => {
    return channelReducer.getJoined(state.channel)
}

export const getAllProjectIds = (state) => {
    return projectReducer.getAllIds(state.project)
}

export const getProjectById = (id, state) => {
    return projectReducer.getById(id, state.project)
}
  
export const getSelectedProjectId = (state) => {
    return projectReducer.getSelectedId(state.project)
}

export const getAllProjectChannelIds = (id, state) => {
    if(id){
        return projectReducer.getAllChannelIds(id, state.project)
    }else{
        return []
    }    
}
export const getIsProjectConnected = (state) => {
    return projectReducer.getConnected(state.project)
}

export const getAllListener = (state) => {
    return listenerReducer.getAll(state.listener)
}
export const getListenerById = (id, state) => {
    return listenerReducer.getById(id, state.listener)
}
export const getSelectedListenerId = (state) => {
    return listenerReducer.getSelectedId(state.listener)
}
export const getIsListenerIds = (state) => {
    return listenerReducer.getIsListeningIds(state.listener)
}
export const getIsListening = (id, state) => {
    return listenerReducer.getIsListening(id, state.listener)
}


export const getPushById = (id, state) => {
    return pushReducer.getById(id, state.push)
}

export const getAllPushIds = (state) => {
    return pushReducer.getAllIds(state.push)
}

export const getSelectedPushId = (state) => {
    return pushReducer.getSelectedId(state.push)
}


export const getAllLogIds = (state) => {
    return terminalReducer.getAllIds(state.terminal)
}

export const getLogById = (id, state) => {
    return terminalReducer.getById(id, state.terminal)
}
    