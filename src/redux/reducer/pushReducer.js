import projectTypes from '../type/projectType'
import channelTypes from '../type/channelType'
import pushTypes from '../type/pushType'
import webSocketTypes from '../type/webSocketType'

const INITIAL_STATE = {
  ui: {
    selectedId: ''
  },
  entities:{
    allIds: [],
    byId: {},
  }
}
const pushReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case projectTypes.CREATE_PROJECT:
      case channelTypes.CREATE_CHANNEL:
      case pushTypes.CREATE_PUSH:
        return createPush(state, action)
      case webSocketTypes.SEND_PUSH:
      case pushTypes.UPDATE_PUSH:
        return updatePush(state, action)
      case pushTypes.CHANGE_PUSH:
        return changePush(state, action)
      case pushTypes.REMOVE_PUSH:
        return removePush(state,action)
      case channelTypes.CHANGE_CHANNEL:
        return changeChannelPush(state, action)
      case projectTypes.IMPORT_REDUX:
        return importPush(state, action)
      case projectTypes.START:
        return clearPush(state, action)
      default:
        return state
    }
}

const importPush = (state, action) => {
  return action.params.push
}
  
const createPush = (state, action) => {
  const {
    pushId,
  } = action.params
  
  const push = {
    [pushId]: {
      eventName:'new_msg',
      body: '{"key":"value"}',
      id: pushId
    }
  }

  return {
    ...state, 
    entities:{
      allIds: state.entities.allIds.concat(pushId),
      byId: {...state.entities.byId, ...push},
    },
    ui: {
      selectedId: pushId,
    }
  }

}

const updatePush = (state, action) => {
  const {
    eventName,
    body,
  } = action.params
  
  const selectedId = getSelectedId(state)
  const push = {
    [selectedId]: {
      eventName: eventName,
      body: body,
      id: selectedId,
    }
  }

  return {
    ...state, 
    entities:{
      allIds: state.entities.allIds,
      byId: {...state.entities.byId, ...push},
    },
    ui:{
      selectedId: selectedId,
    }
  }

}

const changePush = (state, action) => {
  const pushId = action.params.pushId
  return {
    ...state,
    ui:{
      selectedId: pushId
    }
  }

}

const removePush = (state, action) => {
  const pushId = action.params.pushId
  const { [pushId]: removePush, ...newById } = state.entities.byId
  const newAllIds = state.entities.allIds.filter(id => id != pushId)
  return {
    ...state,
    entities:{
      byId: newById,
      allIds: newAllIds
    },
    ui:{
      selectedId: newAllIds[newAllIds.length - 1]
    }
  }
}

const changeChannelPush = (state, action) => {

  const pushIds = action.params.pushIds

  return{
    ...state,
    ui:{
      selectedId: pushIds[0]
    }
  }

}
const clearPush = (state, action) => {
  return {
    ...state,
    ui:{
      selectedId: '',
    }
  }
}



export default pushReducer

export const getSelectedId = (state) => {
  return state.ui.selectedId
}

export const getById = (id, state) => {
  return state.entities.byId[id]
}

export const getAllIds = (state) => {
  return state.entities.allIds
}