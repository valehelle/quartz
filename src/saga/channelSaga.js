import { select, takeLatest, put, call } from 'redux-saga/effects'
import channelTypes from '../redux/type/channelType'
import projectTypes from '../redux/type/projectType'
import * as channelActions from '../redux/action/channelAction'
import * as pushAction from '../redux/action/pushAction'
import * as listenerAction from '../redux/action/listenerAction'
import { getSelectedChannelId, getChannelById } from '../redux/reducer'



function* deleteChannel(action) {
    const state = yield select();
    const channelId = action.params.channelId
    const channel = getChannelById(channelId, state)

    const pushIds = channel.pushIds
    const listenerIds = channel.listenerIds
    for(let i = 0; i < pushIds.length; i++){
        const pushId = pushIds[i]
        const params = {
            pushId
        }

        yield put(pushAction.removePush(params))
    }
    for(let i = 0; i < listenerIds.length; i++){
        const listenerId = listenerIds[i]
        const params = {
            listenerId
        }

        yield put(listenerAction.removeListener(params))
    }

    const params = {
        channelId: action.params.channelId
    }
    yield put(channelActions.removeChannel(params))


}

function* changeChannel(action) {
    const channelIds = action.params.channelIds
    const selectedChannelId = channelIds[0]
    const state = yield select();
    const channel = getChannelById(selectedChannelId, state)

    const params = {
        channelId: channel.id,
        listenerIds: channel.listenerIds,
        pushIds: channel.pushIds
    }
    yield put(channelActions.changeChannel(params))

}



export const channelSaga = [
    takeLatest(channelTypes.DELETE_CHANNEL, deleteChannel),
    takeLatest(projectTypes.CHANGE_PROJECT, changeChannel),
]

export default channelSaga;