import projectType from '../type/projectType'

export const createProject = params => ({
    type: projectType.CREATE_PROJECT,
    params
})
export const changeProject = params => ({
    type: projectType.CHANGE_PROJECT,
    params
})
export const updateProject = params => ({
    type: projectType.UPDATE_PROJECT,
    params
})
export const removeProject = params => ({
    type: projectType.REMOVE_PROJECT,
    params
})
export const projectConnected = params => ({
    type: projectType.PROJECT_CONNECTED,
    params
})
export const start = params => ({
    type: projectType.START,
    params
})
export const importRedux = params => ({
    type: projectType.IMPORT_REDUX,
    params
})