import listenerTypes from '../type/listenerType'
import projectTypes from '../type/projectType'
import channelTypes from '../type/channelType'
import webSocketTypes from '../type/webSocketType'


const INITIAL_STATE = {
  ui: {
    selectedId: '',
    isListeningIds: []
  },
  entities:{
    allIds: [],
    byId: {},
    selectedId: '',
  },
}
const listenerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case projectTypes.CREATE_PROJECT:
      case channelTypes.CREATE_CHANNEL:
      case listenerTypes.CREATE_LISTENER:
        return createListener(state, action)
      case webSocketTypes.LISTEN_EVENT:
        return listenEvent(state, action)
      case listenerTypes.UPDATE_LISTENER:
        return updateListener(state, action)
      case webSocketTypes.UNLISTEN_EVENT:
        return unListenEvent(state, action)
      case channelTypes.CHANGE_CHANNEL:
        return changeChannelListener(state, action)
      case listenerTypes.CHANGE_LISTENER:
        return changeListener(state, action)
      case listenerTypes.REMOVE_LISTENER:
        return removeListener(state, action)
      case projectTypes.START:
        return clearListener(state, action)
      case projectTypes.IMPORT_REDUX:
        return importListener(state, action)
      default:
        return state
    }
}
  
const importListener = (state, action) => {
  return action.params.listener
}

const createListener = (state, action) => {
  const {
    listenerId,
  } = action.params
  
  const listener = {
    [listenerId]: {
      eventName: 'new_msg',
      id: listenerId
    }
  }

  return {
    entities:{
      allIds: state.entities.allIds.concat(listenerId),
      byId: {...state.entities.byId, ...listener},
    },
    ui:{
      selectedId: listenerId,
      isListeningIds: state.ui.isListeningIds
    }
  }

}
const updateListener = (state, action) => {
  const {
    eventName,
  } = action.params
  
  const selectedListenerId = getSelectedId(state)
  const listener = {
    [selectedListenerId]: {
      eventName: eventName,
      id: selectedListenerId
    }
  }

  return {
    ...state, 
    entities:{
      allIds: state.entities.allIds,
      byId: {...state.entities.byId, ...listener},
    },
    ui:{
      ...state.ui,
      isListeningIds: state.ui.isListeningIds.concat(selectedListenerId)
    }
  }

}

const changeChannelListener = (state, action) => {

    const listenerIds = action.params.listenerIds
  
    return{
      ...state,
      ui:{
        selectedId: listenerIds[0],
        isListeningIds: []
      }
    }
  
}

const changeListener = (state, action) => {
  const listenerId = action.params.listenerId
  return{
    ...state,
    ui:{
      ...state.ui,
      selectedId: listenerId
    }
  }
}
const listenEvent = (state, action) => {
  const listenerId = action.params.listenerId

  return{
    ...state,
    ui:{
      ...state.ui,
      isListeningIds: state.ui.isListeningIds.concat(listenerId)
    }
  }
}

const removeListener = (state, action) => {
  const listenerId = action.params.listenerId
  const { [listenerId]: removedListener, ...newById } = state.entities.byId
  const newAllIds = state.entities.allIds.filter(id => id != listenerId)
  const newIsListeningIds = state.ui.isListeningIds.filter(id => id != listenerId)
  return {
    ...state,
    entities:{
      byId: newById,
      allIds: newAllIds
    },
    ui:{
      selectedId: newAllIds[newAllIds.length - 1],
      isListeningIds: newIsListeningIds
    }
  }
}

const clearListener = (state, action) => {
  return {
    ...state,
    ui:{
      selectedId:[],
      isListeningIds:[]
    }
  }
}
const unListenEvent = (state, action) => {
  const listeningId = action.params.listenerId
  const isListeningIds = state.ui.isListeningIds.filter((id) => id != listeningId)
  return {
    ...state,
    ui:{
      ...state.ui,
      isListeningIds: isListeningIds
    }
  }
}



export default listenerReducer

export const getSelectedId = (state) => {
  return state.ui.selectedId
}
export const getById = (id, state) => {
  return state.entities.byId[id]
}
export const getAll = (state) => {
  return state.entities.byId
}

export const getIsListeningIds = (state) => {
  return state.ui.isListeningIds
}

export const getIsListening = (listeningId, state) => {
  const isListening = state.ui.isListeningIds.find((id) =>{
    return id === listeningId
  })
  if(isListening){
    return true
  }else{
    return false
  }
}