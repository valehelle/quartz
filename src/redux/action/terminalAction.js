import terminalTypes from '../type/terminalType'

export const createLog = params => ({
    type: terminalTypes.CREATE_LOG,
    params
})
export const clearTerminal = params => ({
    type: terminalTypes.CLEAR_TERMINAL,
    params
})
export const pauseLog = params => ({
    type: terminalTypes.PAUSE_LOG,
    params
})
