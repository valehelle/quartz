import terminalTypes from '../type/terminalType'
import pushTypes from '../type/pushType'
import webSocketTypes from '../type/webSocketType'
import projectTypes from '../type/projectType'

const INITIAL_STATE = {
  ui: {

  },
  entities:{
    allIds: [],
    byId: {},
  }
}
const terminalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case terminalTypes.CLEAR_TERMINAL:
      case projectTypes.IMPORT_REDUX:
        return clearLog()
      case terminalTypes.CREATE_LOG:
        return createLog(state, action)
      default:
        return state
    }
}

const createLog = (state, action) => {
  const {
    payload,
    logId,
    name
  } = action.params

  const now = new Date();
  const log = {
    [logId]: {
      "payload": {
        ...payload,
        time: now.toString()
      },
      name,
      id: logId,
    }
  }
  return {
    ...state, 
    entities:{
      allIds: state.entities.allIds.concat(logId),
      byId: {...state.entities.byId, ...log},
    }
  }

}

const clearLog = () => {
  return INITIAL_STATE
}

export default terminalReducer

export const getSelectedId = (state) => {
  return state.entities.selectedId
}
export const getAllIds = (state) => {
  return state.entities.allIds
}
export const getById = (id, state) => {
  return state.entities.byId[id]
}