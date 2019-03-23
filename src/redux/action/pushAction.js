import pushType from '../type/pushType'

export const createPush = params => ({
    type: pushType.CREATE_PUSH,
    params
})
export const updatePush = params => ({
    type: pushType.UPDATE_PUSH,
    params
})
export const changePush = params => ({
    type: pushType.CHANGE_PUSH,
    params
})
export const removePush = params => ({
    type: pushType.REMOVE_PUSH,
    params
})

