import projectType from '../type/projectType'
import channelType from '../type/channelType'
import webSocketType from '../type/webSocketType'

const INITIAL_STATE = {
  ui: {
    connected: false,
  },
  entities:{
    allIds: [],
    byId: {},
    selectedId: '',
    channelIds: []
  }
}

const projectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case projectType.CREATE_PROJECT:
        return createProject(state, action)
      case channelType.CREATE_CHANNEL:
        return createChannel(state, action)
      case webSocketType.CONNNECT_SOCKET:
      case projectType.UPDATE_PROJECT:
        return updateProject(state, action)
      case projectType.CHANGE_PROJECT:
        return changeProject(state, action)
      case channelType.REMOVE_CHANNEL:
        return removeChannel(state, action)
      case projectType.REMOVE_PROJECT:
        return removeProject(state, action)
      case projectType.PROJECT_CONNECTED:
        return projectConnected(state, action)
      case projectType.START:
        return clearConnection(state, action)
      case projectType.IMPORT_REDUX:
        return importProject(state, action)
      default:
        return state
    }
}
const importProject = (state, action) => {
  return action.params.project
}
const createProject = (state, action) => {
  const {
    projectId,
    channelId

  } = action.params
  const newProject = {
    [projectId]: {
      id: projectId,
      url: 'ws:localhost:3000',
      endpoint: '/socket',
      parameters: '{"key":"value"}',
      channelIds: [channelId]
    }
  }

  return {
    ...state, 
    entities:{
      allIds: Array.prototype.concat.apply(projectId,state.entities.allIds),
      byId: {...state.entities.byId, ...newProject},
    },
    ui:{
      selectedId: projectId
    }
  }
}

const updateProject = (state, action) => {
  const {
    url,
    endpoint,
    parameters,
  } = action.params
  const selectedProjectId = getSelectedId(state)
  const selectedProject = getById(selectedProjectId, state)
  const newProject = {
    [selectedProjectId]: {
      url,
      endpoint,
      parameters: parameters,
      channelIds: selectedProject.channelIds,
      id: selectedProjectId
    }
  }


  return {
    ...state, 
    entities:{
      allIds: state.entities.allIds,
      byId: {...state.entities.byId, ...newProject},
      selectedId: selectedProjectId
    }
  }
}

const createChannel = (state, action) => {
  const selectedChannelId = action.params.channelId
  const selectedProjectId = getSelectedId(state)
  const project  = getById(selectedProjectId, state)
  const channelIds = Array.prototype.concat.apply(selectedChannelId, project.channelIds)
  
  const newChannelProject = {
    [selectedProjectId]: {
      ...project,
      channelIds: channelIds
    }

  }
  return{
    ...state,
    entities:{
      ...state.entities,
      byId: {...state.entities.byId, ...newChannelProject},
    }
  }
}

const changeProject = (state, action) => {
    const projectId = action.params.projectId

    return{
      ...state,
      ui:{
        selectedId: projectId
      }
    }
}

const removeChannel = (state, action) => {
  const channelId = action.params.channelId

  const selectedProjectId = getSelectedId(state)
  const project  = getById(selectedProjectId, state)
  const channelIds = project.channelIds.filter(id => id != channelId)
  
  const newProject = {
    [selectedProjectId]: {
      ...project,
      channelIds: channelIds
    }

  }
  return{
    ...state,
    entities:{
      ...state.entities,
      byId: {...state.entities.byId, ...newProject},
    }
  }
}

const removeProject = (state, action) => {
  const projectId = action.params.projectId


  const { [projectId]: removedProject, ...newById } = state.entities.byId
  const newAllIds = state.entities.allIds.filter(id => id != projectId)
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

const projectConnected = (state, action) => {
  return {
    ...state,
    ui:{
      ...state.ui,
      connected: true
    }
  }
}

const clearConnection = (state, action) => {
  return {
    ...state,
    ui:{
      ...state.ui,
      connected: false
    }
  }
}
export const getSelectedId = (state) => {
  return state.ui.selectedId
}

export const getById = (id, state) => {
  return state.entities.byId[id]
}
export const getAllIds = (state) => {
  return state.entities.allIds
}
export const getAllChannelIds = (id, state) => {
  return state.entities.byId[id].channelIds
}
export const getConnected = (state) => {
  return state.ui.connected
}


export default projectReducer