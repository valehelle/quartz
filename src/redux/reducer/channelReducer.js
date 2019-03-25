import projectTypes from '../type/projectType'
import channelTypes from '../type/channelType'
import listenerTypes from '../type/listenerType'
import webSocketTypes from '../type/webSocketType'
import pushTypes from '../type/pushType'
import { getAllProjectChannelIds } from '.';

const INITIAL_STATE = {
    ui: {
      joined: false,
      selectedId: '',
    },
    entities:{
      allIds: [],
      byId: {},
    }
}
const channel = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case projectTypes.CREATE_PROJECT:
      case channelTypes.CREATE_CHANNEL:
        return createChannel(state, action)
      case webSocketTypes.JOIN_CHANNEL:
      case channelTypes.UPDATE_CHANNEL:
        return updateChannel(state, action)
      case listenerTypes.CREATE_LISTENER:
        return createListener(state, action)
      case pushTypes.CREATE_PUSH:
        return createPush(state,action)
      case channelTypes.CHANGE_CHANNEL:
        return changeChannel(state, action)
      case pushTypes.REMOVE_PUSH:
        return removePush(state,action)
      case listenerTypes.REMOVE_LISTENER:
        return removeListener(state, action)
      case channelTypes.REMOVE_CHANNEL:
        return removeChannel(state, action)
      case projectTypes.START:
        return clearJoined(state, action)
      case channelTypes.CHANNEL_JOINED:
        return channelJoined(state, action)
      case projectTypes.IMPORT_REDUX:
        return importChannel(state, action)
      default:
        return state
    }
}

const importChannel = (state, action) => {

  return action.params.channel
}

const createChannel = (state, action) => {
  const {
    channelId,
    listenerId,
    pushId,
  } = action.params
  const newChannel = {
    [channelId]: {
      topic: 'room:lobby',
      listenerIds: [listenerId],
      pushIds: [pushId],
      id: channelId
    }
  }
    return {          
      ...state, 
      entities:{
        allIds: state.entities.allIds.concat(channelId),
        byId: {...state.entities.byId, ...newChannel},
      },
      ui:{
        selectedId: channelId,
        joined: false,
      }
    }
}

const updateChannel = (state, action) => {
  const {
    topic
  } = action.params
  const selectedChannelId = getSelectedId(state)
  const selectedChannel = getById(selectedChannelId, state)

  const updateChannel = {
    [selectedChannelId]: {
      topic: topic,
      listenerIds: selectedChannel.listenerIds,
      pushIds: selectedChannel.pushIds,
      id: selectedChannelId
    }
  }
  
  return {          
      ...state, 
      entities:{
        allIds: state.entities.allIds,
        byId: {...state.entities.byId, ...updateChannel},
      }    
  }

}


const createListener = (state, action) => {
  const listenerId = action.params.listenerId
  const selectedChannelId = getSelectedId(state)
  const channel  = getById(selectedChannelId, state)
  const listenerIds = Array.prototype.concat.apply(listenerId, channel.listenerIds)
  
  const newChannel = {
    [selectedChannelId]: {
      ...channel,
      listenerIds: listenerIds,
    }

  }
  return{
    ...state,
    entities:{
      ...state.entities,
      byId: {...state.entities.byId, ...newChannel},
    }
  }
}

const createPush = (state, action) => {
  const pushId = action.params.pushId
  const selectedChannelId = getSelectedId(state)
  const channel  = getById(selectedChannelId, state)
  const pushIds = Array.prototype.concat.apply(pushId, channel.pushIds)
  
  const newChannel = {
    [selectedChannelId]: {
      ...channel,
      pushIds: pushIds
    }

  }
  return{
    ...state,
    entities:{
      ...state.entities,
      byId: {...state.entities.byId, ...newChannel},
    }
  }
}

const removePush = (state, action) =>{
  const pushId = action.params.pushId
  const selectedChannelId = getSelectedId(state)
  if(selectedChannelId){
    const channel  = getById(selectedChannelId, state)
    const pushIds = channel.pushIds.filter(id => id != pushId)
    
    const newChannel = {
      [selectedChannelId]: {
        ...channel,
        pushIds: pushIds
      }

    }
    return{
      ...state,
      entities:{
        ...state.entities,
        byId: {...state.entities.byId, ...newChannel},
      }
    }
  }else{
    return state
  }

}

const removeListener = (state, action) =>{
  const listenerId = action.params.listenerId
  const selectedChannelId = getSelectedId(state)
  if(selectedChannelId){
    const channel  = getById(selectedChannelId, state)
    const listenerIds = channel.listenerIds.filter(id => id != listenerId)
    
    const newChannel = {
      [selectedChannelId]: {
        ...channel,
        listenerIds: listenerIds
      }

    }
    return{
      ...state,
      entities:{
        ...state.entities,
        byId: {...state.entities.byId, ...newChannel},
      }
    }
  }else{
    return state
  }
}

const changeChannel = (state, action) => {
  const channelId = action.params.channelId

  return{
    ...state,
    ui:{
      ...state.ui,
      selectedId: channelId,
      joined: false
    }
  }
}

const channelJoined = (state, action) => {

  return{
    ...state,
    ui:{
      ...state.ui,
      joined: true
    }
  }
}

const removeChannel = (state, action) => {
  const channelId = action.params.channelId

  const { [channelId]: removedChannel, ...newById } = state.entities.byId
  const newAllIds = state.entities.allIds.filter(id => id != channelId)
  return {
    ...state,
    entities:{
      byId: newById,
      allIds: newAllIds
    },
    ui:{
      ...state.ui,
      selectedId: newAllIds[newAllIds.length - 1]
    }
  }
}


const clearJoined = (state, action) => {
  return {
    ...state,
    ui:{
      ...state.ui,
      selectedId: '',
      joined: false
    }
  }
}

export default channel

export const getSelectedId = (state) => {
  return state.ui.selectedId
}
export const getById = (id, state) => {
  return state.entities.byId[id]
}
  
export const getAllIds = (state) => {
  return state.entities.allIds
}

export const getAllListenerIds = (id, state) => {
  return state.entities.byId[id].listenerIds
}

export const getAllPushIds = (id, state) => {
  return state.entities.byId[id].pushIds
}

export const getJoined = (state) => {
  return state.ui.joined
}
