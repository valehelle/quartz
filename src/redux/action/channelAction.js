import channelTypes from '../type/channelType'


export const createChannel = params => ({
    type: channelTypes.CREATE_CHANNEL,
    params
})

export const updateChannel = params => ({
    type: channelTypes.UPDATE_CHANNEL,
    params
})
export const changeChannel = params => ({
    type: channelTypes.CHANGE_CHANNEL,
    params
})
export const removeChannel = params => ({
    type: channelTypes.REMOVE_CHANNEL,
    params
})
export const deleteChannel = params => ({
    type: channelTypes.DELETE_CHANNEL,
    params
})
export const channelJoined = params => ({
    type: channelTypes.CHANNEL_JOINED,
    params
})



