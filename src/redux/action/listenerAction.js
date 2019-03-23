import listenerType from '../type/listenerType'

export const createListener = params => ({
    type: listenerType.CREATE_LISTENER,
    params
})
export const updateListener = params => ({
    type: listenerType.UPDATE_LISTENER,
    params
})
export const changeListener = params => ({
    type: listenerType.CHANGE_LISTENER,
    params
})
export const removeListener = params => ({
    type: listenerType.REMOVE_LISTENER,
    params
})
export const deleteListener = params => ({
    type: listenerType.DELETE_LISTENER,
    params
})
